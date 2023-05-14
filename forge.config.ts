import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';

// const toPrune = [
//   "^src$",
//   "^tsconfig\\.json$",
//   "^[^\\/\\\\]*\\.config\\.ts$",
//   "^index\\.html$",
//   "^package-lock\\.json$",
//   "^\\.vscode$",
//   "^\\.eslintrc\\.json$",
//   "^\\.gitignore$"
// ]

var targets: string[] = [];

const config: ForgeConfig = {
  rebuildConfig: {},
  makers: [new MakerSquirrel({
    authors: 'Zhen Peng Li Liang',
    description: 'A Json Viewer and HttpProxy to test applications.'
  }), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: "src/main.ts",
          config: "vite.main.config.ts"
        },
        {
          entry: "src/preload.ts",
          config: "vite.preload.config.ts"
        }
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.main.config.ts"
        }
      ]
    }),
  ],
  packagerConfig: {
    // afterCopy: [
    // (buildPath: string, electronVersion: string, platform: string, arch: string) => {
    //   const cwd = buildPath;
    //   const targets = globSync("**/*", { cwd }).filter((e) => toPrune.some((r) => e.match(r)));
    //   Promise.all(targets.map((target) => {
    //     return fs.unlink(path.join(cwd, target), (err) => { });
    //   }));
    // }
    // ],
    ignore: [
      /^\/src$/g,
      /^\/tsconfig\.json$/g,
      /^\/[^\/\\]*\.config\.ts$/g,
      // /index\.html$/g,
      /^\/\.vscode$/g,
      /^\/\.eslintrc\.json$/g,
      /^\/\.gitignore$/g
    ]
  }
};

export default config;
