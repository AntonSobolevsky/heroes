module.exports = {
  name: 'heroes',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/heroes',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
