/**
 * (C)opyright Michael Duve, Felix Maulwurf, Angelina Staeck
 *
 * @module: VideoItem
 * @requires: jQuery
 * @requires: Utilities
 *
 * This module describes the properties of an video item.
 * video: adress of the video file, name: name of the video, length: duration of the video,
 * start: starttime of the video, end: endtime of the video,
 * size: volume of the video, resolution: width and height pixel, thumbnail: picture from the video
 */

define(["jquery", "utilities"], (function ($, Utils) {
    "use strict";

    /**
     * initializes a new instance
     * @param settings {Object} a JSON-Object which holds all informations for the module
     * @constructor
     */
    function VideoItem(settings) {
        this.settings = {
            video: null,
            name: "TEST",
            length: 100,
            start: 0,
            end: 100,
            size: 5500,
            type: "",
            resolution: {
                width: 3840,
                height: 2160
            },
            thumbnail: null,
            prettySize: "0 MB",
            videoElement: null,
            data: null,
            fps: 24
        };

        // if settings where not set by initializing, fill with default settings
        $.extend(this.settings, settings || {});

        this.initialize();
    }

    VideoItem.prototype = {
        initialize: function () {
            VideoItem.indices = (VideoItem.indices || 0) + 1;
            this.id = VideoItem.indices;
            $(this.settings.videoElement).attr("id", "video-item-" + this.id);

        },
        getMarkUp: function () {
            return '<li class="file" id="video-item-' + this.id + '">' +
                '<div class="file-delete icon_close"></div>' +
                '<img class="file-thumb" src="' + this.settings.thumbnail + '" alt="' + this.settings.name + '" />' +
                '<div class="file-info">' +
                '<p><span class="file-name">' + this.settings.name + '</span></p>' +
                '<p><span class="file-duration">' + Utils.timeFormat(this.settings.length) + ' min</span></p>' +
                '<p class="small"><span class="file-resolution">' + this.settings.resolution.width + " x " + this.settings.resolution.height + ' px</span><span class="file-size">' + this.settings.prettySize + '</span></p>' +
                '</div></li>';
        },
        deleteItem: function () {
            $("#video-item-" + this.id).remove();
            this.settings = null;
            delete this.settings;
        },
        /**
         * describes this Object to the user
         * @returns {String} representation of this Object
         */
        toString: function () {
            var replacer = function (key, value) {
                console.log(key);
                if (key === "data" || key === "thumbnail" || key === "video" || key === "videoElement") {
                    return undefined;
                }
                return value;
            };
            return JSON.stringify(this, replacer, "\t");

        }
    };

    return VideoItem;

}));


