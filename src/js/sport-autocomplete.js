'use strict';

import $ from 'jquery'
import ACTIVITIES_API_URI from './config'

if (document.getElementById('sports') !== null) {
    document.getElementById('sports').addEventListener('focus', function () {
        import('jquery-ui/ui/widgets/autocomplete').then(() => {

            Array.prototype.last = function () {
                return this[this.length - 1];
            };

            function split(val) {
                return val.split(/,\s*/);
            }

            $('#sports')
                .on("keydown", function (event) {
                    if (event.keyCode === $.ui.keyCode.TAB &&
                        $(this).autocomplete("instance").menu.active) {
                        event.preventDefault();
                    }
                })
                .autocomplete({
                    source: function (request, response) {
                        $.ajax({
                            url: ACTIVITIES_API_URI,
                            data: {
                                term: request.term
                            },
                            success: function (data) {
                                let subString = request.term.split(/\s*,\s*/).last().normalize().toLowerCase();
                                data = data.filter(obj => obj.fields.label.normalize().toLowerCase().includes(subString));
                                response($.map(data, function (object) {
                                    return object.fields.label
                                }))
                            }
                        })
                    },
                    minLength: 0,
                    focus: function () {
                        return false;
                    },
                    select: function (event, ui) {
                        let terms = split(this.value);
                        terms.pop();
                        terms.push(ui.item.value);
                        terms.push("");
                        this.value = terms.join(", ");
                        return false;
                    }
                });
        });
    });
}
