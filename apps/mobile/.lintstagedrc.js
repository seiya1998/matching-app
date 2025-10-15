const { ESLint } = require("eslint");

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    })
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(' ');
};

module.exports = {
  '{app,hooks,utils,store}/**/*.{ts,tsx,js,jsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    if (filesToLint.length === 0) {
      return [];
    }
    return [
      `prettier --write --ignore-unknown --config ./prettier.config.js ${files.join(
        ' '
      )}`,
      `eslint --fix --max-warnings=0 './{app,hooks,utils,store}/**/*.{ts,tsx,js,jsx}' --config .eslintrc.js`,
      `tsc --noEmit`,
      'secretlint "**/*"'
    ];
  },
};
