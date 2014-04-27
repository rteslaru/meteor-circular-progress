Package.describe({
  summary: "A reactive, flexible, SVG-based circular progress bar for Meteor"
});

Package.on_use(function (api) {
    api.use(['templating'], 'client');
    api.add_files(['lib/circular_progress.html', 'lib/circular_progress.js'], 'client');
});

