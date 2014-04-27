Package.describe({
  summary: "A reactive, flexible, SVG-based circular progress bar for Meteor"
});

Package.on_use(function (api) {
    api.use(['templating', 'd3'], 'client');
    api.add_files(['circular_progress.html', 'circular_progress.js'], 'client');
});

