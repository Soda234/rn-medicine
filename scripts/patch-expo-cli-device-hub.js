/**
 * Expo SDK 55's CLI only knows Simulator.app. Xcode 27 replaced that app
 * with Device Hub, so `expo start --ios` fails before the simulator opens.
 * Re-apply the SDK 56+ Device Hub behavior onto the installed CLI.
 */
const fs = require('fs');
const path = require('path');

const cliRoot = path.join(
  __dirname,
  '..',
  'node_modules',
  'expo',
  'node_modules',
  '@expo',
  'cli',
  'build',
  'src',
  'start'
);

const replacements = [
  {
    file: path.join(cliRoot, 'doctor', 'apple', 'SimulatorAppPrerequisite.js'),
    from: `async function getSimulatorAppIdViaAppleScriptAsync() {
    try {
        return (await (0, _osascript().execAsync)('id of app "Simulator"')).trim();
    } catch  {
    // This error may occur in CI where the user intends to install just the simulators but no
    // Xcode, or when Simulator.app is not registered in LaunchServices (e.g. Xcode on an
    // external or renamed volume).
    }
    return null;
}`,
    to: `async function getSimulatorAppIdViaAppleScriptAsync() {
    // Xcode 27 replaces Simulator.app with DeviceHub.app.
    const osascript = _osascript();
    const lookup = osascript.safeIdOfAppAsync ?? (async (appName)=>{
        try {
            return (await osascript.execAsync(\`id of app "\${appName}"\`)).trim();
        } catch  {
            return null;
        }
    });
    return await lookup('Simulator') || await lookup('DeviceHub');
}`,
  },
  {
    file: path.join(cliRoot, 'doctor', 'apple', 'SimulatorAppPrerequisite.js'),
    from: `        const simulatorInfoPlist = _path().default.join(developerDir.trim(), 'Applications', 'Simulator.app', 'Contents', 'Info.plist');
        const { stdout: bundleId } = await (0, _spawnasync().default)('defaults', [
            'read',
            simulatorInfoPlist,
            'CFBundleIdentifier'
        ]);
        return bundleId.trim() || null;`,
    to: `        const developerDirPath = developerDir.trim();
        const infoPlistPaths = [
            _path().default.join(developerDirPath, 'Applications', 'Simulator.app', 'Contents', 'Info.plist'),
            _path().default.join(developerDirPath, '..', 'Applications', 'DeviceHub.app', 'Contents', 'Info.plist')
        ];
        for (const simulatorInfoPlist of infoPlistPaths){
            try {
                const { stdout: bundleId } = await (0, _spawnasync().default)('defaults', [
                    'read',
                    simulatorInfoPlist,
                    'CFBundleIdentifier'
                ]);
                if (bundleId.trim()) {
                    return bundleId.trim();
                }
            } catch  {
            // Try the next known Xcode simulator app location.
            }
        }
        return null;`,
  },
  {
    file: path.join(cliRoot, 'doctor', 'apple', 'SimulatorAppPrerequisite.js'),
    from: `        if (result !== 'com.apple.iphonesimulator' && result !== 'com.apple.CoreSimulator.SimulatorTrampoline') {
            throw new _Prerequisite.PrerequisiteCommandError('SIMULATOR_APP', "Simulator is installed but is identified as '" + result + "'; don't know what that is.");
        }`,
    to: `        if (result !== 'com.apple.dt.Devices' && result !== 'com.apple.iphonesimulator' && result !== 'com.apple.CoreSimulator.SimulatorTrampoline') {
            throw new _Prerequisite.PrerequisiteCommandError('SIMULATOR_APP', "Device Hub or Simulator is installed but is identified as '" + result + "'; don't know what that is.");
        }`,
  },
  {
    file: path.join(cliRoot, 'platforms', 'ios', 'ensureSimulatorAppRunning.js'),
    from: `tell app "System Events" to count processes whose name is "Simulator"`,
    to: `tell app "System Events" to count processes whose name is "Simulator" or name is "DeviceHub"`,
  },
  {
    file: path.join(cliRoot, 'platforms', 'ios', 'ensureSimulatorAppRunning.js'),
    from: `async function openSimulatorAppAsync(device) {
    const args = [
        '-a',
        'Simulator'
    ];
    if (device.udid) {
        // This has no effect if the app is already running.
        args.push('--args', '-CurrentDeviceUDID', device.udid);
    }
    await (0, _spawnasync().default)('open', args);
}`,
    to: `async function openSimulatorAppAsync(device) {
    const args = [
        '-a',
        'Simulator'
    ];
    if (device.udid) {
        // This has no effect if the app is already running.
        args.push('--args', '-CurrentDeviceUDID', device.udid);
    }
    try {
        await (0, _spawnasync().default)('open', args);
    } catch  {
        // Xcode 27 opens the selected simulator through Device Hub.
        if (device.udid) {
            await (0, _spawnasync().default)('open', [
                \`devices://device/open?id=\${device.udid}\`
            ]);
            return;
        }
        await (0, _spawnasync().default)('open', [
            '-a',
            'DeviceHub'
        ]);
    }
}`,
  },
  {
    file: path.join(cliRoot, 'platforms', 'ios', 'AppleDeviceManager.js'),
    from: `        await (0, _ensureSimulatorAppRunning.ensureSimulatorAppRunningAsync)(this.device);
        // TODO: Focus the individual window
        await _osascript().execAsync(\`tell application "Simulator" to activate\`);`,
    to: `        await (0, _ensureSimulatorAppRunning.ensureSimulatorAppRunningAsync)(this.device);
        // TODO: Focus the individual window
        try {
            await _osascript().execAsync(\`tell application "Simulator" to activate\`);
        } catch  {
            try {
                await _osascript().execAsync(\`tell application "DeviceHub" to activate\`);
            } catch  {
            // Opening devices:// already focuses Device Hub. Don't fail the launch.
            }
        }`,
  },
];

let applied = 0;
for (const { file, from, to } of replacements) {
  if (!fs.existsSync(file)) {
    console.warn(`skip missing file: ${path.relative(process.cwd(), file)}`);
    continue;
  }
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes(to)) {
    continue;
  }
  if (!source.includes(from)) {
    console.warn(`pattern not found in ${path.relative(process.cwd(), file)}`);
    continue;
  }
  fs.writeFileSync(file, source.replace(from, to));
  applied += 1;
}

if (applied === 0) {
  console.log('Expo CLI already opens Device Hub.');
} else {
  console.log(`Patched Expo CLI for Device Hub (${applied} change${applied === 1 ? '' : 's'}).`);
}
