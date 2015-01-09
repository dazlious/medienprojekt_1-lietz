requirejs.config({
    baseUrl:"../../videochop/js/",
    paths: {
        "jquery": "lib/jquery-2.1.1.min",
        "jqueryui": "lib/jquery-ui.min",
        "modernizr": "lib/modernizr",
        "useragent": "lib/ua-parser.min",
        "filereader": 'lib/filereader',
        "videoItemLoader": "modules/videoItemLoader",
        "videoItem": "modules/videoItem",
        "videoList": "modules/videoList",
        "previewVideo": "modules/previewVideo",
        "popcorn": "lib/popcorn.min",
        "popcorn-capture": "lib/popcorn.capture"
    },
    shim: {
        "videoItemLoader": {
            deps: ["jquery", "videoItem", "popcorn", "popcorn-capture"]
        },
        "popcorn-capture": {
            deps: ["popcorn"]
        },
        "popcorn": {
            deps: ["jquery"]
        },
        "videoItem": {
            deps: ["jquery"]
        },
        "modernizr": {
            deps: ["jquery"]
        },
        "videoList": {
            deps: ["jquery", "videoItem"]
        },
        "previewVideo": {
            deps: ["jquery", "videoList"]
        }
    },
    waitSeconds: 0
});
define(["jquery", "jqueryui", "videoItem", "videoList", "videoItemLoader", "filereader", "previewVideo"], (function ($, ui, VideoItem, VideoList, VideoItemLoader, FileReaderJS, PreviewVideo) {
    "use strict";

        $(document).ready(function() {

            /*video list for debug reasons*/
            var videoList = new VideoList({
                container: ".file-list"
            });

            var modulePreviewVideo = new PreviewVideo({
                videoList: videoList,
                vidContainer: ".preview-video"
            });

            /*video item loader for debug reasons*/
            /**
             * VideoItemLoader
             */
            var moduleVideoItemLoader = new VideoItemLoader({
                tempWrapper: ".temporary-video",
                list: videoList
            });

            var fileReaderOpts = {
                readAsDefault: 'ArrayBuffer',
                accept: "video/*",
                on: {
                    loadend: function (e, file) {
                        moduleVideoItemLoader.add({
                            data: new Uint8Array(e.target.result),
                            extension: file.extra.extension,
                            name: file.extra.nameNoExtension,
                            prettySize: file.extra.prettySize,
                            size: file.size,
                            type: file.type
                        });
                    }
                }
            };

            FileReaderJS.setupInput($(".file-add")[0], fileReaderOpts);

            $(".timeline").sortable({
                revert: 10,
                opacity: 0.3,
                axis: "x"
            });

            $( "ul, li" ).disableSelection();

            $(".file-list").on('click', ".file", function (e) {

                var fileId = $(this).attr("id");
                var split = fileId.split("-");

                modulePreviewVideo.showPreview(videoList.videolist[split[2]]);

            });

            $("#prepare").on('click', function (e) {
                modulePreviewVideo.prepareToPlay();
            });

            $("#play").on('click', function (e) {
                modulePreviewVideo.playVideo();
            });

        });

}));