function buildAddOn() {
}
function actionDuplicateDraft() {
}
function actionEmailForwarder() {
}
function actionMailMerge() {
}
function actionEmailCleanup() {
}
function actionEmailResponder() {
}
function actionEmailStudio() {
}
function actionEmailScheduler() {
}
function actionCheckAccess() {
}
function createGmailAuthUi() {
}
function actionLogin() {
}
function runBackgroundSendDebugLogs() {
}!function(e, a) {
    for (var i in a) e[i] = a[i];
}(this, function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 26);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return ADD_ON;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return CACHE;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return SYSTEM_LABELS;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return ACTIONS;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return SERVICE;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return EMAIL;
    });
    var ADD_ON = "Email Studio", CACHE = {
        CONTACTS: "gcontact",
        RULES: "rules",
        STATUS: "status",
        LABELS: "labels",
        USERID: "userId",
        EMAIL: "email",
        ALIAS: "alias",
        DRAFTS: "drafts",
        LICENSE: "license",
        WEBAPP: "webapp"
    }, SYSTEM_LABELS = {
        "Choose label": "",
        Inbox: "inbox",
        Spam: "spam",
        Trash: "trash"
    }, ACTIONS = {
        SCHEDULER: "actionEmailScheduler",
        FORWARDER: "actionEmailForwarder",
        RESPONDER: "actionEmailResponder",
        DUPLICATE: "actionDuplicateDraft",
        CLEANUP: "actionEmailCleanup",
        MAILMERGE: "actionMailMerge",
        SWITCHAPP: "actionEmailStudio",
        SERVICE: "service",
        KEY: "action",
        ADD: "add",
        EDIT: "edit",
        SAVE: "save",
        RUN: "run",
        DELETE: "delete",
        SHOW: "show",
        REFRESH: "refresh",
        SEARCH: "search"
    }, SERVICE = {
        FORWARDER: "forwarded",
        RESPONDER: "responded",
        SCHEDULER: "scheduled",
        CLEANUP: "cleanup",
        MAILMERGE: "mailmerge",
        DUPLICATE: "copydraft",
        GMAIL: "gmail",
        USER: "user",
        SERVICEROOT: "services",
        LOGIN: "login",
        LOGOUT: "logout",
        RESET: "reset",
        DEBUG: "debug"
    }, EMAIL = {
        ID: "id",
        TO: "To",
        CC: "Cc",
        BCC: "Bcc",
        FROM: "From",
        REPLYTO: "Reply-To",
        SUBJECT: "Subject",
        ATTACHMENTS: "attachments",
        PLAIN_BODY: "plainBody",
        INLINE_IMAGES: "inlineImages",
        HTML_BODY: "htmlBody",
        DATE: "date",
        NAME: "name",
        MESSAGE: "message",
        LABEL: "label",
        QUERY: "query",
        FORWARD_TO: "fwd",
        DRAFT_ID: "draft",
        ADVANCED: "advanced",
        CONTACTS: "contacts"
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "c", function() {
        return expBackoff;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return getUserEmail;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return getGmailAPI;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return addEmails;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return createRuleId;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return truncate;
    });
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
    }, expBackoff = (Date.now(), function(func) {
        for (var n = 0; n < 4; n += 1) try {
            return func();
        } catch (e) {
            if (3 === n) throw e;
            Utilities.sleep(1e3 * Math.pow(2, n) + Math.round(1e3 * Math.random()));
        }
        return null;
    }), getUserEmail = function() {
        return Session.getActiveUser().getEmail() || Session.getEffectiveUser().getEmail();
    }, getGmailAPI = function(params) {
        return "https://emailstudio.pro?" + function(params) {
            return Object.keys(params).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
            }).join("&");
        }(_extends({
            user: getUserEmail()
        }, params));
    }, addEmails = function() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
        try {
            return args.join(",").trim().replace(/^,+|,+$/g, "").replace(/,+/g, ",");
        } catch (f) {
            console.error(f);
        }
        return "";
    }, createRuleId = function() {
        return Utilities.formatDate(new Date(), "GMT", "YYYYMMddhhmmss");
    }, truncate = function() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 38;
        return text.length > n ? text.substr(0, n - 1) + "..." : text;
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return fetchNode;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return updateNode;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return deleteNode;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return fetchServiceRules;
    });
    var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7), _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12), _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
    }, ACTION_SET = "SET", ACTION_GET = "GET", store = function(action) {
        var service = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "", key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "", json = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null, name = function(service, key) {
            return [ service, key ].join("/");
        }(service, key);
        switch (action) {
          case ACTION_SET:
            return _props__WEBPACK_IMPORTED_MODULE_2__["a"].setUserProperty(name, json);

          case ACTION_GET:
            return _props__WEBPACK_IMPORTED_MODULE_2__["a"].getUserProperty(name);

          default:
            return null;
        }
    }, fetchNode = function(service, key) {
        var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return store(ACTION_GET, service, key, defaultValue);
    }, updateRulesCache = function() {
        var rules = fetchNode(_constants__WEBPACK_IMPORTED_MODULE_0__["e"].SERVICEROOT, null, null);
        return rules ? _cache__WEBPACK_IMPORTED_MODULE_1__["a"].setCacheValue(_constants__WEBPACK_IMPORTED_MODULE_0__["c"].RULES, rules, !0) : _cache__WEBPACK_IMPORTED_MODULE_1__["a"].deleteCacheValue(_constants__WEBPACK_IMPORTED_MODULE_0__["c"].RULES), 
        rules || {};
    }, updateNode = function(service, key, value) {
        store(ACTION_SET, service, key, value), updateRulesCache();
    }, deleteNode = function(service, key) {
        return updateNode(service, key, null);
    }, fetchServiceRules = function() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "", refreshCache = arguments.length > 1 && arguments[1] !== undefined && arguments[1], rules = {}, data = _cache__WEBPACK_IMPORTED_MODULE_1__["a"].getCacheValue(_constants__WEBPACK_IMPORTED_MODULE_0__["c"].RULES, !0);
        return !refreshCache && data || (data = updateRulesCache()), Object.keys(data).forEach(function(service) {
            rules[service] = [], Object.keys(data[service]).sort().reverse().forEach(function(id) {
                rules[service].push(_extends({
                    id: id
                }, data[service][id]));
            });
        }), name ? rules[name] || [] : rules;
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return showInfoNotification;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return showErrorNotification;
    });
    var showNotification = function(message, type) {
        return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText(message).setType(type)).build();
    }, showInfoNotification = function(message) {
        return showNotification(message, CardService.NotificationType.INFO);
    }, showErrorNotification = function(message) {
        return showNotification(message, CardService.NotificationType.ERROR);
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return CLEANUP;
    });
    var CLEANUP = {
        LABEL: "label",
        TO: "To",
        FROM: "From",
        SUBJECT: "Subject",
        ADVANCED: "advanced",
        QUERY: "query",
        TARGET: "target",
        ARCHIVE: "archive",
        STAR: "star",
        TRASH: "trash",
        REMOVE: "remove",
        READ: "read",
        OLDER: "older",
        UNSUBSCRIBE: "unsubscribe",
        ACTION: "action"
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "c", function() {
        return getGmailLabels;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return getGmailDrafts;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return getGmailAliases;
    });
    var getGmailLabels = function() {
        return Gmail.Users.Labels.list("me").labels.map(function(_ref) {
            return _ref.name;
        }).sort();
    }, getGmailDrafts = function() {
        return Gmail.Users.Drafts.list("me").drafts.map(function(_ref2) {
            return _ref2.id;
        });
    }, getGmailAliases = function() {
        return Gmail.Users.Settings.SendAs.list("me").sendAs.map(function(alias) {
            return alias.sendAsEmail;
        }).sort();
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return buildAddOn;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return serviceSection;
    });
    var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
    var APPS = [ {
        title: "Email Forwarder",
        service: _utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].FORWARDER,
        subtitle: "Forward your email messages from Gmail to any other email address, automatically."
    }, {
        title: "Email Scheduler",
        service: _utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].SCHEDULER,
        subtitle: "Schedule emails inside Gmail and send them later at your preferred date and time even on a recurring schedule."
    }, {
        title: "Email Auto-Responder",
        service: _utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].RESPONDER,
        subtitle: "Smart auto-replies that help you automatically respond to both old and incoming email messages in Gmail."
    }, {
        title: "Email Merge",
        service: _utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].MAILMERGE,
        subtitle: "Send personalized email messages to multiple Google Contacts from a single draft message in Gmail."
    }, {
        title: "Email Clean Up",
        service: _utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].CLEANUP,
        subtitle: "Unsubcribe from bulk mails, auto-purge emails that are older than few days, archive redundant messages, or trash them."
    }, {
        title: "Email Draft Copier",
        service: _utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].DUPLICATE,
        subtitle: "Create multiple copies of any existing draft message in Gmail for sending to different contacts manually."
    } ], getAppSection = function(_ref) {
        var obj, key, value, title = _ref.title, service = _ref.service, subtitle = _ref.subtitle;
        return CardService.newCardSection().addWidget(CardService.newTextButton().setText(title).setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].SWITCHAPP).setParameters((obj = {}, 
        key = _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].SERVICE, value = service, 
        key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj)))).addWidget(CardService.newTextParagraph().setText(subtitle));
    }, buildAddOn = function() {
        Object(_auth__WEBPACK_IMPORTED_MODULE_1__["a"])();
        var card = CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["b"]).setSubtitle("Do more with Gmail").setImageStyle(CardService.ImageStyle.SQUARE));
        return APPS.forEach(function(_ref2) {
            var title = _ref2.title, service = _ref2.service, subtitle = _ref2.subtitle;
            card.addSection(getAppSection({
                title: title,
                service: service,
                subtitle: subtitle
            }));
        }), card.build();
    }, serviceSection = function() {
        return CardService.newCardSection().setHeader("Credits").addWidget(CardService.newTextParagraph().setText("Email Studio is developed by Digital Inspiration with Google Apps Script")).addWidget(CardService.newTextButton().setText("Download").setOpenLink(CardService.newOpenLink().setUrl("https://digitalinspiration.com/").setOpenAs(CardService.OpenAs.FULL_SIZE)));
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }();
    var cache = new (function() {
        function Cache() {
            !function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Cache), this.cache = null;
        }
        return _createClass(Cache, [ {
            key: "getCache",
            value: function() {
                return null === this.cache && (this.cache = CacheService.getUserCache()), this.cache;
            }
        }, {
            key: "getCacheValue",
            value: function(key) {
                var json = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
                try {
                    var value = this.getCache().get(key);
                    if (value) return json ? JSON.parse(value) : value;
                } catch (f) {
                    console.error(f);
                }
                return null;
            }
        }, {
            key: "setCacheValue",
            value: function(key, value) {
                var json = arguments.length > 2 && arguments[2] !== undefined && arguments[2];
                try {
                    if (!value || json && !Object.keys(value).length) return void this.deleteCacheValue(key);
                    this.getCache().put(key, json ? JSON.stringify(value) : value, 21600);
                } catch (f) {
                    console.error(f);
                }
            }
        }, {
            key: "setCacheValues",
            value: function(json) {
                this.getCache().putAll(json, 21600);
            }
        }, {
            key: "deleteCacheValue",
            value: function(key) {
                this.getCache().remove(key);
            }
        }, {
            key: "deleteCacheValues",
            value: function(keys) {
                this.getCache().removeAll(keys);
            }
        } ]), Cache;
    }())();
    __webpack_exports__["a"] = cache;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return replaceCardNavigation;
    });
    var replaceCardNavigation = function(card) {
        return CardService.newNavigation().popToRoot().updateCard(card);
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return actionSearchPreview;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return actionRunRule;
    });
    var _gmail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10), ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1), _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
    }, actionSearchPreview = function(e) {
        var input = _extends({}, e.formInput, {
            service: e.service
        }), query = Object(_gmail__WEBPACK_IMPORTED_MODULE_0__["a"])(input), url = "https://mail.google.com/mail/#search/" + encodeURIComponent(query);
        return CardService.newActionResponseBuilder().setOpenLink(CardService.newOpenLink().setUrl(url)).build();
    }, actionRunRule = function(e) {
        return CardService.newActionResponseBuilder().setOpenLink(CardService.newOpenLink().setUrl(Object(___WEBPACK_IMPORTED_MODULE_1__["d"])(e)).setOpenAs(CardService.OpenAs.FULL_SIZE).setOnClose(CardService.OnClose.NOTHING)).build();
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return makeGmailSearchQuery;
    });
    var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), cleanGmailLabel = function(label) {
        return label.replace(/["&]/g, "").replace(/[/\s()]/g, "-");
    }, makeGmailSearchQuery = function(params) {
        var _params$service = params.service, service = _params$service === undefined ? "" : _params$service, label = params.label, To = params.To, From = params.From, Subject = params.Subject, advanced = params.advanced, _params$older = params.older, older = _params$older === undefined ? "" : _params$older, target = params.target, statement = [];
        return label && statement.push("label:" + cleanGmailLabel(label)), older && "Anytime" !== older && statement.push("older_than:" + older), 
        From && statement.push("from:(" + From.trim() + ")"), To && statement.push("to:(" + To.trim() + ")"), 
        Subject && statement.push("subject:(" + Subject.trim() + ")"), advanced && statement.push("" + advanced.trim()), 
        "" === statement.join("").trim() ? "" : (service !== _constants__WEBPACK_IMPORTED_MODULE_0__["e"].RESPONDER && service !== _constants__WEBPACK_IMPORTED_MODULE_0__["e"].FORWARDER || statement.push("-label:" + service), 
        target && statement.push("-label:" + cleanGmailLabel(target)), statement.join(" ").trim());
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return actionLogin;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return actionCheckAccess;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return createGmailAuthUi;
    });
    var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1), _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _utils_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7), _utils_props__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12), resetStatus = function() {
        _utils_cache__WEBPACK_IMPORTED_MODULE_2__["a"].deleteCacheValue(_utils_constants__WEBPACK_IMPORTED_MODULE_1__["c"].STATUS), 
        _utils_props__WEBPACK_IMPORTED_MODULE_3__["a"].deleteUserProperty(_utils_constants__WEBPACK_IMPORTED_MODULE_1__["c"].STATUS);
    }, actionLogin = function() {
        return resetStatus(), CardService.newActionResponseBuilder().setOpenLink((service = _utils_constants__WEBPACK_IMPORTED_MODULE_1__["e"].LOGIN, 
        CardService.newOpenLink().setUrl(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["d"])({
            service: service
        })).setOpenAs(CardService.OpenAs.FULL_SIZE).setOnClose(CardService.OnClose.RELOAD_ADD_ON))).build();
        var service;
    }, actionCheckAccess = function() {
        Object(_utils__WEBPACK_IMPORTED_MODULE_0__["e"])() || (resetStatus(), CardService.newAuthorizationException().setAuthorizationUrl(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["d"])({
            service: _utils_constants__WEBPACK_IMPORTED_MODULE_1__["e"].LOGIN
        })).setResourceDisplayName(_utils_constants__WEBPACK_IMPORTED_MODULE_1__["b"]).setCustomUiCallback("createGmailAuthUi").throwException());
    }, createGmailAuthUi = function() {
        return [ CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle("Welcome to " + _utils_constants__WEBPACK_IMPORTED_MODULE_1__["b"])).addSection(CardService.newCardSection().addWidget(CardService.newImage().setImageUrl("https://digitalinspiration.com/images/email-studio-features.png").setAltText(_utils_constants__WEBPACK_IMPORTED_MODULE_1__["b"])).addWidget(CardService.newTextButton().setText("Log In with Gmail").setOnClickAction(CardService.newAction().setFunctionName("actionLogin")))).build() ];
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7), _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }();
    var properties = new (function() {
        function Properties() {
            !function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Properties), this.userProps = null;
        }
        return _createClass(Properties, [ {
            key: "getUserProps",
            value: function() {
                return null === this.userProps && (this.userProps = PropertiesService.getUserProperties()), 
                this.userProps;
            }
        }, {
            key: "getUserProperty",
            value: function(key) {
                var json = arguments.length > 1 && arguments[1] !== undefined && arguments[1], value = this.getUserProps().getProperty(key);
                return value && _cache__WEBPACK_IMPORTED_MODULE_0__["a"].setCacheValue(key, value, json), 
                json ? JSON.parse(value || "{}") : value;
            }
        }, {
            key: "setUserProperty",
            value: function(key, value) {
                var json = arguments.length > 2 && arguments[2] !== undefined && arguments[2];
                _cache__WEBPACK_IMPORTED_MODULE_0__["a"].setCacheValue(key, value, json), this.getUserProps().setProperty(key, json ? JSON.stringify(value) : value);
            }
        }, {
            key: "deleteUserProperty",
            value: function(key) {
                this.getUserProps().deleteProperty(key);
            }
        }, {
            key: "deleteUserProperties",
            value: function() {
                this.getUserProps().deleteAllProperties();
            }
        } ]), Properties;
    }())();
    __webpack_exports__["a"] = properties;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6), _utils_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var service = _utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].SCHEDULER, existingRulesSection = function() {
        var sections = [];
        return Object(_utils_store__WEBPACK_IMPORTED_MODULE_2__["c"])(service, !0).forEach(function(rule) {
            var _ref, id, text, subject;
            sections.push((id = (_ref = rule).id, text = _ref.text, subject = _ref.subject, 
            CardService.newCardSection().addWidget(CardService.newKeyValue().setTopLabel("Draft:").setContent(subject).setMultiline(!0)).addWidget(CardService.newKeyValue().setTopLabel("Schedule:").setContent(text).setMultiline(!0)).addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText("Edit").setOnClickOpenLinkAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].SCHEDULER).setParameters(_defineProperty({
                id: id
            }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].EDIT)))).addButton(CardService.newTextButton().setText("Delete").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].SCHEDULER).setParameters(_defineProperty({
                id: id
            }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].DELETE)))))));
        }), sections;
    };
    __webpack_exports__["a"] = function(message) {
        var card = CardService.newCardBuilder();
        return card.setHeader(CardService.newCardHeader().setTitle("Email Scheduler").setSubtitle("Send emails later with Gmail")), 
        existingRulesSection().forEach(function(es) {
            return card.addSection(es);
        }), card.addSection(function(message) {
            var section = CardService.newCardSection();
            return message && section.setHeader("<b>" + message + "</b>"), section.addWidget(CardService.newTextButton().setText("Add New Schedule").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].SCHEDULER).setParameters(_defineProperty({}, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].ADD))));
        }(message)), card.addSection(Object(_ui__WEBPACK_IMPORTED_MODULE_1__["b"])()), card.build();
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6), _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1), _utils_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var getSingleRuleSection = function(_ref) {
        var id = _ref.id, rule = function(obj, keys) {
            var target = {};
            for (var i in obj) keys.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(obj, i) && (target[i] = obj[i]);
            return target;
        }(_ref, [ "id" ]);
        return CardService.newCardSection().addWidget(CardService.newKeyValue().setTopLabel("Matches:").setContent(rule[_utils_constants__WEBPACK_IMPORTED_MODULE_0__["d"].QUERY]).setMultiline(!0)).addWidget(CardService.newKeyValue().setTopLabel("Do this:").setContent("Forward to " + rule[_utils_constants__WEBPACK_IMPORTED_MODULE_0__["d"].FORWARD_TO]).setMultiline(!0)).addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText("Edit").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].FORWARDER).setParameters(_defineProperty({
            id: id
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].EDIT)))).addButton(CardService.newTextButton().setText("Run").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].FORWARDER).setParameters(_defineProperty({
            id: id
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].RUN)))).addButton(CardService.newTextButton().setText("Delete").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].FORWARDER).setParameters(_defineProperty({
            id: id
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].DELETE)))));
    };
    __webpack_exports__["a"] = function(message) {
        var sections, card = CardService.newCardBuilder();
        card.setHeader(CardService.newCardHeader().setTitle("Email Forwarder").setSubtitle("Forward your emails to another adddress")), 
        (sections = [], Object(_utils_store__WEBPACK_IMPORTED_MODULE_3__["c"])(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].FORWARDER).forEach(function(rule) {
            sections.push(getSingleRuleSection(rule));
        }), sections).forEach(function(es) {
            return card.addSection(es);
        });
        var section = CardService.newCardSection();
        return message && section.setHeader("<b>" + message + "</b>"), section.addWidget(CardService.newTextButton().setText("Add New Rule").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].FORWARDER).setParameters(_defineProperty({
            id: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["b"])()
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].ADD)))), 
        card.addSection(section), card.addSection(Object(_ui__WEBPACK_IMPORTED_MODULE_1__["b"])()), 
        card.build();
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6), _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1), _utils_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var getSingleRuleSection = function(_ref) {
        var id = _ref.id, rule = function(obj, keys) {
            var target = {};
            for (var i in obj) keys.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(obj, i) && (target[i] = obj[i]);
            return target;
        }(_ref, [ "id" ]);
        return CardService.newCardSection().addWidget(CardService.newKeyValue().setTopLabel("Matches:").setContent(rule[_utils_constants__WEBPACK_IMPORTED_MODULE_0__["d"].QUERY]).setMultiline(!0)).addWidget(CardService.newKeyValue().setTopLabel("Do this:").setContent('Auto-reply with "' + rule[_utils_constants__WEBPACK_IMPORTED_MODULE_0__["d"].NAME] + '"').setMultiline(!0)).addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText("Edit").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].RESPONDER).setParameters(_defineProperty({
            id: id
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].EDIT)))).addButton(CardService.newTextButton().setText("Run").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].RESPONDER).setParameters(_defineProperty({
            id: id
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].RUN)))).addButton(CardService.newTextButton().setText("Delete").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].RESPONDER).setParameters(_defineProperty({
            id: id
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].DELETE)))));
    };
    __webpack_exports__["a"] = function(message) {
        var sections, card = CardService.newCardBuilder();
        card.setHeader(CardService.newCardHeader().setTitle("Email Responder").setSubtitle("Smart Auto-Replies for Gmail")), 
        (sections = [], Object(_utils_store__WEBPACK_IMPORTED_MODULE_3__["c"])(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].RESPONDER).forEach(function(rule) {
            sections.push(getSingleRuleSection(rule));
        }), sections).forEach(function(es) {
            return card.addSection(es);
        });
        var section = CardService.newCardSection();
        return message && section.setHeader("<b>" + message + "</b>"), section.addWidget(CardService.newTextButton().setText("Add New Rule").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].RESPONDER).setParameters(_defineProperty({
            id: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["b"])()
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].ADD)))), 
        card.addSection(section), card.addSection(Object(_ui__WEBPACK_IMPORTED_MODULE_1__["b"])()), 
        card.build();
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return DUPLICATE_FIELDS;
    });
    var DUPLICATE_FIELDS = {
        ID: "id",
        COUNT: "count"
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1), _utils_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2), _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6), _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var getSingleRuleSection = function(_ref) {
        var id = _ref.id, rule = function(obj, keys) {
            var target = {};
            for (var i in obj) keys.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(obj, i) && (target[i] = obj[i]);
            return target;
        }(_ref, [ "id" ]);
        return CardService.newCardSection().addWidget(CardService.newKeyValue().setTopLabel("Matches:").setContent(rule[_constants__WEBPACK_IMPORTED_MODULE_4__["a"].QUERY] || "").setMultiline(!0)).addWidget(CardService.newKeyValue().setTopLabel("Do this:").setContent(rule[_constants__WEBPACK_IMPORTED_MODULE_4__["a"].ACTION] || "").setMultiline(!0)).addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText("Edit").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].CLEANUP).setParameters(_defineProperty({
            id: id
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].EDIT)))).addButton(CardService.newTextButton().setText("Run").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].CLEANUP).setParameters(_defineProperty({
            id: id
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].RUN)))).addButton(CardService.newTextButton().setText("Delete").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].CLEANUP).setParameters(_defineProperty({
            id: id
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].DELETE)))));
    };
    __webpack_exports__["a"] = function(message) {
        var sections, card = CardService.newCardBuilder();
        card.setHeader(CardService.newCardHeader().setTitle("Email Clean-up").setSubtitle("Keep your Gmail mailbox tidy")), 
        (sections = [], Object(_utils_store__WEBPACK_IMPORTED_MODULE_2__["c"])(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].CLEANUP).forEach(function(rule) {
            sections.push(getSingleRuleSection(rule));
        }), sections).forEach(function(es) {
            return card.addSection(es);
        });
        var section = CardService.newCardSection();
        return message && section.setHeader("<b>" + message + "</b>"), section.addWidget(CardService.newTextButton().setText("Add New Rule").setOnClickAction(CardService.newAction().setFunctionName(_utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].CLEANUP).setParameters(_defineProperty({
            id: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["b"])()
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].KEY, _utils_constants__WEBPACK_IMPORTED_MODULE_0__["a"].ADD)))), 
        card.addSection(section), card.addSection(Object(_ui__WEBPACK_IMPORTED_MODULE_3__["b"])()), 
        card.build();
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return runBackgroundSendDebugLogs;
    });
    var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1), runBackgroundSendDebugLogs = function() {
        return CardService.newUniversalActionResponseBuilder().setOpenLink(CardService.newOpenLink().setUrl(Object(___WEBPACK_IMPORTED_MODULE_1__["d"])({
            service: _constants__WEBPACK_IMPORTED_MODULE_0__["e"].DEBUG
        })).setOpenAs(CardService.OpenAs.FULL_SIZE).setOnClose(CardService.OnClose.NOTHING)).build();
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1), _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _utils_notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3), _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    __webpack_exports__["a"] = function(_ref) {
        var url, link, formInput = _ref.formInput;
        return formInput[_utils_constants__WEBPACK_IMPORTED_MODULE_1__["d"].ID] ? (url = function(formInput) {
            var _params, params = (_defineProperty(_params = {
                service: _utils_constants__WEBPACK_IMPORTED_MODULE_1__["e"].DUPLICATE
            }, _constants__WEBPACK_IMPORTED_MODULE_3__["a"].COUNT, formInput[_constants__WEBPACK_IMPORTED_MODULE_3__["a"].COUNT]), 
            _defineProperty(_params, _utils_constants__WEBPACK_IMPORTED_MODULE_1__["d"].ID, formInput[_utils_constants__WEBPACK_IMPORTED_MODULE_1__["d"].ID]), 
            _params);
            return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["d"])(params);
        }(formInput), link = CardService.newOpenLink().setUrl(url).setOpenAs(CardService.OpenAs.FULL_SIZE).setOnClose(CardService.OnClose.NOTHING), 
        CardService.newActionResponseBuilder().setOpenLink(link).setNotification(CardService.newNotification().setText("Copying in progress..").setType(CardService.NotificationType.INFO)).build()) : Object(_utils_notification__WEBPACK_IMPORTED_MODULE_2__["a"])("Please select an email draft");
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1), _utils_notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3), _utils_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2), _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
    };
    var service = _utils_constants__WEBPACK_IMPORTED_MODULE_0__["e"].MAILMERGE;
    __webpack_exports__["a"] = function(_ref) {
        var obj, key, value, formInput = _ref.formInput, googleContacts = (_ref.formInputs[_utils_constants__WEBPACK_IMPORTED_MODULE_0__["d"].CONTACTS] || []).join(",").toString(), data = _extends({}, formInput, (obj = {}, 
        key = _utils_constants__WEBPACK_IMPORTED_MODULE_0__["d"].TO, value = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["a"])(formInput[_utils_constants__WEBPACK_IMPORTED_MODULE_0__["d"].TO], googleContacts), 
        key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj));
        return data[_utils_constants__WEBPACK_IMPORTED_MODULE_0__["d"].TO] ? data[_utils_constants__WEBPACK_IMPORTED_MODULE_0__["d"].DRAFT_ID] ? data[_utils_constants__WEBPACK_IMPORTED_MODULE_0__["d"].TO].replace(/[^@]/g, "").length > 25 ? Object(_utils_notification__WEBPACK_IMPORTED_MODULE_2__["a"])("Please select < 25 recipients") : (Object(_utils_store__WEBPACK_IMPORTED_MODULE_3__["d"])(service, service, data), 
        CardService.newActionResponseBuilder().setOpenLink(CardService.newOpenLink().setUrl("" + Object(_utils__WEBPACK_IMPORTED_MODULE_1__["d"])({
            service: service
        })).setOpenAs(CardService.OpenAs.FULL_SIZE).setOnClose(CardService.OnClose.NOTHING)).build()) : Object(_utils_notification__WEBPACK_IMPORTED_MODULE_2__["a"])("Please select a draft template") : Object(_utils_notification__WEBPACK_IMPORTED_MODULE_2__["a"])("Please specify at least one recipient");
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13), _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1), _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0), _utils_notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3), _utils_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8), _utils_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2), _utils_cache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7), service = _utils_constants__WEBPACK_IMPORTED_MODULE_2__["e"].SCHEDULER, openSchedulerWindow = function(url) {
        var link = CardService.newOpenLink().setUrl(url).setOpenAs(CardService.OpenAs.FULL_SIZE).setOnClose(CardService.OnClose.NOTHING);
        return CardService.newActionResponseBuilder().setOpenLink(link).setStateChanged(!0).build();
    }, actionScheduleAddRule = function(_ref) {
        var _ref$userTimezone = _ref.userTimezone, userTimezone = _ref$userTimezone === undefined ? {} : _ref$userTimezone;
        return openSchedulerWindow(function(userTimezone) {
            var timezone = userTimezone.timezone, offset = userTimezone.offset;
            return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["d"])({
                service: service,
                timezone: timezone,
                offset: offset
            });
        }(userTimezone));
    }, actionScheduleEditRule = function(_ref2) {
        var parameters = _ref2.parameters;
        return openSchedulerWindow(function() {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["b"])();
            return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["d"])({
                service: service,
                id: id
            });
        }(parameters.id));
    };
    __webpack_exports__["a"] = function(e) {
        switch (e.parameters[_utils_constants__WEBPACK_IMPORTED_MODULE_2__["a"].KEY]) {
          case _utils_constants__WEBPACK_IMPORTED_MODULE_2__["a"].ADD:
            return actionScheduleAddRule(e);

          case _utils_constants__WEBPACK_IMPORTED_MODULE_2__["a"].EDIT:
            return actionScheduleEditRule(e);

          case _utils_constants__WEBPACK_IMPORTED_MODULE_2__["a"].DELETE:
            return function(e) {
                return Object(_utils_store__WEBPACK_IMPORTED_MODULE_5__["a"])(service, e.parameters.id), 
                CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText("Rule deleted").setType(CardService.NotificationType.INFO)).setNavigation(Object(_utils_cards__WEBPACK_IMPORTED_MODULE_4__["a"])(Object(_cards__WEBPACK_IMPORTED_MODULE_0__["a"])("Rule deleted successfully"))).build();
            }(e);

          case _utils_constants__WEBPACK_IMPORTED_MODULE_2__["a"].SHOW:
            return _utils_cache__WEBPACK_IMPORTED_MODULE_6__["a"].deleteCacheValue(_utils_constants__WEBPACK_IMPORTED_MODULE_2__["c"].RULES), 
            CardService.newActionResponseBuilder().setNavigation(Object(_utils_cards__WEBPACK_IMPORTED_MODULE_4__["a"])(Object(_cards__WEBPACK_IMPORTED_MODULE_0__["a"])())).build();

          default:
            return Object(_utils_notification__WEBPACK_IMPORTED_MODULE_3__["b"])("Hello!");
        }
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var constants = __webpack_require__(0), notification = __webpack_require__(3), cards = __webpack_require__(13), forwarder_cards = __webpack_require__(14), responder_cards = __webpack_require__(15), user = __webpack_require__(5), ui = __webpack_require__(6), duplicate_constants = __webpack_require__(16), utils = __webpack_require__(1), duplicate_cards = function() {
        return CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle("Duplicate Drafts").setSubtitle("Make multiple copies of Gmail drafts")).addSection(CardService.newCardSection().addWidget(function() {
            if (0 === Object(user["b"])().length) return CardService.newTextParagraph().setText("No Gmail drafts found");
            var selectionInput = CardService.newSelectionInput().setFieldName(constants["d"].ID).setType(CardService.SelectionInputType.DROPDOWN).addItem("Select Gmail Draft...", "", !0);
            return Object(user["b"])().forEach(function(draft) {
                selectionInput.addItem(Object(utils["f"])(draft[constants["d"].SUBJECT]), draft[constants["d"].ID], !1);
            }), selectionInput;
        }()).addWidget(function() {
            for (var selectionInput = CardService.newSelectionInput().setFieldName(duplicate_constants["a"].COUNT).setTitle("Number of Copies").setType(CardService.SelectionInputType.RADIO_BUTTON), count = 1; count <= 5; count += 1) selectionInput.addItem(String(count), count, 1 === count);
            return selectionInput;
        }()).addWidget(CardService.newTextButton().setText("Duplicate").setOnClickAction(CardService.newAction().setFunctionName(constants["a"].DUPLICATE)))).addSection(Object(ui["b"])()).build();
    }, cleanup_cards = __webpack_require__(17), cache = __webpack_require__(7), cards_contacts = function() {
        var contacts = cache["a"].getCacheValue(constants["c"].CONTACTS, !0);
        contacts || (contacts = {}, function() {
            try {
                var url = "https://www.google.com/m8/feeds/contacts/default/thin?access_token=" + ScriptApp.getOAuthToken() + "&alt=json&max-results=499", response = Object(utils["c"])(function() {
                    return UrlFetchApp.fetch(url);
                });
                return JSON.parse(response.getContentText()).feed.entry;
            } catch (f) {
                return [];
            }
        }().forEach(function(contact) {
            var emails = [];
            if ((contact.gd$email || []).forEach(function(_ref) {
                var _ref$address = _ref.address, address = _ref$address === undefined ? "" : _ref$address;
                address.match(/\S+@\S+\.\S+/) && emails.push(address.toLowerCase().trim());
            }), emails.length) {
                var value = emails[0];
                contact.title.$t && (value = contact.title.$t + " <" + emails[0] + ">"), contacts[value] = contact.title.$t || emails[0];
            }
        }), cache["a"].setCacheValue(constants["c"].CONTACTS, contacts, !0));
        var contactsGroup = CardService.newSelectionInput().setFieldName(constants["d"].CONTACTS).setType(CardService.SelectionInputType.CHECK_BOX);
        Object.keys(contacts).sort().forEach(function(contact) {
            contactsGroup.addItem(contacts[contact], contact, !1);
        }), contactsGroup.addItem("noreply@example.com", "Test Email <noreply@example.com>", !1);
        var section = CardService.newCardSection();
        return section.setHeader("Add Google Contacts"), section.setCollapsible(!0), section.addWidget(contactsGroup), 
        section;
    }, addTextInput = function(fieldName, title) {
        return CardService.newTextInput().setFieldName(fieldName).setTitle(title);
    }, config = function() {
        return CardService.newCardSection().setHeader("Step 1: Configure Mail Merge").setCollapsible(!1).addWidget((emailSelection = CardService.newSelectionInput().setTitle("Sender's Email Address").setFieldName(constants["d"].FROM).setType(CardService.SelectionInputType.RADIO_BUTTON), 
        Object(user["a"])().forEach(function(email) {
            emailSelection.addItem(email, email, Object(utils["e"])() === email);
        }), emailSelection)).addWidget(addTextInput(constants["d"].NAME, "Sender's  Name")).addWidget(addTextInput(constants["d"].REPLYTO, "Reply-to Address")).addWidget(addTextInput(constants["d"].TO, "TO Addresses:")).addWidget(addTextInput(constants["d"].CC, "CC Addresses:")).addWidget(addTextInput(constants["d"].BCC, "BCC Addresses:")).addWidget((selectionInput = CardService.newSelectionInput().setFieldName(constants["d"].DRAFT_ID).setTitle("Select Email Template").setType(CardService.SelectionInputType.DROPDOWN).addItem("Select Gmail draft..", "", !0), 
        Object(user["b"])().forEach(function(draft) {
            selectionInput.addItem(Object(utils["f"])(draft[constants["d"].SUBJECT]), draft[constants["d"].ID], !1);
        }), selectionInput));
        var selectionInput, emailSelection;
    };
    var merge_cards = function() {
        return CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle("Mail Merge").setSubtitle("Send personalized emails from Gmail")).addSection(config()).addSection(cards_contacts()).addSection(CardService.newCardSection().addWidget(CardService.newTextButton().setText("Run Mail Merge").setOnClickAction(CardService.newAction().setFunctionName(constants["a"].MAILMERGE).setParameters((obj = {}, 
        key = constants["a"].KEY, value = constants["a"].RUN, key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj))))).addSection(Object(ui["b"])()).build();
        var obj, key, value;
    }, utils_cards = __webpack_require__(8);
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return actions_actionEmailStudio;
    });
    var actions_pushCard = function(card) {
        return CardService.newActionResponseBuilder().setNavigation(Object(utils_cards["a"])(card)).build();
    }, actions_actionEmailStudio = function(e) {
        var _e$formInput = e.formInput, formInput = _e$formInput === undefined ? {} : _e$formInput, _e$parameters = e.parameters, parameters = _e$parameters === undefined ? {} : _e$parameters;
        switch (formInput.service || parameters.service) {
          case constants["e"].FORWARDER:
            return actions_pushCard(Object(forwarder_cards["a"])());

          case constants["e"].SCHEDULER:
            return actions_pushCard(Object(cards["a"])());

          case constants["e"].RESPONDER:
            return actions_pushCard(Object(responder_cards["a"])());

          case constants["e"].DUPLICATE:
            return actions_pushCard(duplicate_cards());

          case constants["e"].CLEANUP:
            return actions_pushCard(Object(cleanup_cards["a"])());

          case constants["e"].MAILMERGE:
            return actions_pushCard(merge_cards());

          default:
            return Object(notification["a"])(":(");
        }
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var cards = __webpack_require__(15), constants = __webpack_require__(0), user = __webpack_require__(5), store = __webpack_require__(2), utils = __webpack_require__(1);
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var service = constants["e"].RESPONDER, edit_getAddRuleSection = function(id) {
        var props = Object(store["b"])(service, id, {}), getInputWidget = function(fieldName, fieldTitle) {
            return CardService.newTextInput().setFieldName(fieldName).setTitle(fieldTitle).setValue(props[fieldName] || "");
        };
        return CardService.newCardSection().addWidget(CardService.newTextParagraph().setText("If all the following conditions are met:")).addWidget(function() {
            var defaultLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "", widget = CardService.newSelectionInput().setFieldName(constants["d"].LABEL).setTitle("Search").setType(CardService.SelectionInputType.DROPDOWN);
            return Object.keys(constants["f"]).forEach(function(label) {
                widget.addItem(label, constants["f"][label], constants["f"][label] === defaultLabel);
            }), Object(user["c"])().forEach(function(label) {
                widget.addItem(Object(utils["f"])(label), label, label === defaultLabel);
            }), widget;
        }(props[constants["d"].LABEL])).addWidget(getInputWidget(constants["d"].FROM, "From")).addWidget(getInputWidget(constants["d"].TO, "To")).addWidget(getInputWidget(constants["d"].SUBJECT, "Subject")).addWidget(getInputWidget(constants["d"].ADVANCED, "Advanced Search")).addWidget(CardService.newTextParagraph().setText("Respond to matched email with the draft:")).addWidget(function() {
            var draftId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            if (0 === Object(user["b"])().length) return CardService.newTextParagraph().setText("No Gmail drafts found");
            var selectionInput = CardService.newSelectionInput().setFieldName(constants["d"].DRAFT_ID).setTitle("Select Gmail Draft").setType(CardService.SelectionInputType.DROPDOWN).addItem("Select Gmail Draft..", "", "" === draftId);
            return Object(user["b"])().forEach(function(draft) {
                selectionInput.addItem(Object(utils["f"])(draft[constants["d"].SUBJECT]), draft[constants["d"].ID], draftId === draft[constants["d"].ID]);
            }), selectionInput;
        }(props[constants["d"].DRAFT_ID] || "")).addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText("Save").setOnClickAction(CardService.newAction().setFunctionName(constants["a"].RESPONDER).setParameters(_defineProperty({
            id: id
        }, constants["a"].KEY, constants["a"].SAVE)))).addButton(CardService.newTextButton().setText("Preview").setOnClickAction(CardService.newAction().setFunctionName(constants["a"].RESPONDER).setParameters(_defineProperty({}, constants["a"].KEY, constants["a"].SEARCH)))));
    }, notification = __webpack_require__(3), search = __webpack_require__(9), utils_cards = __webpack_require__(8), gmail = __webpack_require__(10), _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
    };
    function actions_defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var actions_service = constants["e"].RESPONDER, actions_actionRespondSaveRule = function(e) {
        var _extends2, query = Object(gmail["a"])(_extends({}, e.formInput, {
            service: actions_service
        }));
        return "" === query ? Object(notification["a"])("Please specify at least one condition") : e.formInput[constants["d"].DRAFT_ID] ? (Object(store["d"])(actions_service, e.parameters.id, _extends({}, e.formInput, (actions_defineProperty(_extends2 = {}, constants["d"].QUERY, query), 
        actions_defineProperty(_extends2, constants["d"].NAME, function(id) {
            for (var drafts = Object(user["b"])(), d = 0, l = drafts.length; d < l; d += 1) if (drafts[d][constants["d"].ID] === id) return drafts[d][constants["d"].SUBJECT];
            return "Draft not found";
        }(e.formInput[constants["d"].DRAFT_ID])), _extends2))), CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText("Rule added successfully").setType(CardService.NotificationType.INFO)).setNavigation(Object(utils_cards["a"])(Object(cards["a"])("Rule added"))).build()) : Object(notification["a"])("Please select a draft for reply");
    }, actions_actionRespondEditRule = function(e) {
        var card = CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle("Email Responder").setSubtitle("Create a Search Query")).addSection(edit_getAddRuleSection(e.parameters.id)).build();
        return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().pushCard(card)).build();
    };
    __webpack_exports__["a"] = function(e) {
        switch (e.parameters[constants["a"].KEY]) {
          case constants["a"].ADD:
          case constants["a"].EDIT:
            return actions_actionRespondEditRule(e);

          case constants["a"].DELETE:
            return function(e) {
                return Object(store["a"])(actions_service, e.parameters.id), CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText("Rule deleted").setType(CardService.NotificationType.INFO)).setNavigation(Object(utils_cards["a"])(Object(cards["a"])("Rule deleted successfully"))).build();
            }(e);

          case constants["a"].SAVE:
            return actions_actionRespondSaveRule(e);

          case constants["a"].SEARCH:
            return Object(search["b"])(_extends({}, e, {
                service: actions_service
            }));

          case constants["a"].RUN:
            return Object(search["a"])({
                id: e.parameters.id,
                service: actions_service
            });

          default:
            return Object(notification["b"])("Hello!");
        }
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var cards = __webpack_require__(17), constants = __webpack_require__(0), user = __webpack_require__(5), store = __webpack_require__(2), cleanup_constants = __webpack_require__(4), utils = __webpack_require__(1);
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var TTL = {
        Anytime: "Anytime",
        "1d": "1 day ago",
        "2d": "2 days ago",
        "3d": "3 days ago",
        "4d": "4 days ago",
        "5d": "5 days ago",
        "6d": "6 days ago",
        "7d": "1 week ago",
        "14d": "2 weeks ago",
        "21d": "3 weeks ago",
        "1m": "1 month ago",
        "2m": "2 months ago",
        "3m": "3 months ago",
        "4m": "4 months ago",
        "5m": "5 months ago",
        "6m": "6 months ago",
        "1y": "1 year ago",
        "2y": "2 years ago",
        "3y": "3 years ago",
        "4y": "4 years ago",
        "5y": "5 years ago",
        "6y": "6 years ago"
    }, edit_getGmailLabelsWidget = function(title, fieldName) {
        var defaultLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "", widget = CardService.newSelectionInput().setFieldName(fieldName).setTitle(title).setType(CardService.SelectionInputType.DROPDOWN);
        return Object.keys(constants["f"]).forEach(function(label) {
            widget.addItem(label, constants["f"][label], constants["f"][label] === defaultLabel);
        }), Object(user["c"])().forEach(function(label) {
            widget.addItem(Object(utils["f"])(label), label, label === defaultLabel);
        }), widget;
    }, edit_getAddRuleSection = function(id) {
        var props = Object(store["b"])(constants["e"].CLEANUP, id, {}), getInputWidget = function(fieldName, fieldTitle) {
            return CardService.newTextInput().setFieldName(fieldName).setTitle(fieldTitle).setValue(props[fieldName] || "");
        }, getCBWidget = function(fieldName, fieldTitle) {
            return CardService.newSelectionInput().setType(CardService.SelectionInputType.CHECK_BOX).setFieldName(fieldName).addItem(fieldTitle, fieldName, fieldName === props[fieldName]);
        };
        return CardService.newCardSection().addWidget(CardService.newTextParagraph().setText("If all the following conditions are met:")).addWidget(edit_getGmailLabelsWidget("Search", cleanup_constants["a"].LABEL, props[cleanup_constants["a"].LABEL])).addWidget(function(title, fieldName) {
            var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Anytime", widget = CardService.newSelectionInput().setFieldName(fieldName).setTitle(title).setType(CardService.SelectionInputType.DROPDOWN);
            return Object.keys(TTL).forEach(function(t) {
                widget.addItem(TTL[t], t, t === defaultValue);
            }), widget;
        }("Received", cleanup_constants["a"].OLDER, props[cleanup_constants["a"].OLDER])).addWidget(getInputWidget(cleanup_constants["a"].FROM, "From")).addWidget(getInputWidget(cleanup_constants["a"].SUBJECT, "Subject")).addWidget(getInputWidget(cleanup_constants["a"].ADVANCED, "Advanced Search")).addWidget(CardService.newTextParagraph().setText("<br>Do the following to the matched emails:")).addWidget(getCBWidget(cleanup_constants["a"].ARCHIVE, "Archive it")).addWidget(getCBWidget(cleanup_constants["a"].READ, "Mark as Read")).addWidget(getCBWidget(cleanup_constants["a"].STAR, "Star it")).addWidget(getCBWidget(cleanup_constants["a"].UNSUBSCRIBE, "Unsubscribe from List")).addWidget(getCBWidget(cleanup_constants["a"].TRASH, "Move to Trash")).addWidget(getCBWidget(cleanup_constants["a"].REMOVE, "Delete Permanently")).addWidget(edit_getGmailLabelsWidget("Apply the Label", cleanup_constants["a"].TARGET, props[cleanup_constants["a"].TARGET], [ "spam", "trash" ])).addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText("Save").setOnClickAction(CardService.newAction().setFunctionName(constants["a"].CLEANUP).setParameters(_defineProperty({
            id: id
        }, constants["a"].KEY, constants["a"].SAVE)))).addButton(CardService.newTextButton().setText("Preview").setOnClickAction(CardService.newAction().setFunctionName(constants["a"].CLEANUP).setParameters(_defineProperty({}, constants["a"].KEY, constants["a"].SEARCH)))));
    }, search = __webpack_require__(9), notification = __webpack_require__(3), utils_cards = __webpack_require__(8), gmail = __webpack_require__(10), _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
    };
    function actions_defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var service = constants["e"].CLEANUP, actions_actionCleanupEditRule = function(e) {
        var card = CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle("Email Clean-up").setSubtitle("Create a Search Query")).addSection(edit_getAddRuleSection(e.parameters.id)).build();
        return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().pushCard(card)).build();
    };
    __webpack_exports__["a"] = function(e) {
        switch (e.parameters[constants["a"].KEY]) {
          case constants["a"].ADD:
          case constants["a"].EDIT:
            return actions_actionCleanupEditRule(e);

          case constants["a"].DELETE:
            return function(e) {
                return Object(store["a"])(service, e.parameters.id), CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText("Rule deleted").setType(CardService.NotificationType.INFO)).setNavigation(Object(utils_cards["a"])(Object(cards["a"])("Rule deleted successfully"))).build();
            }(e);

          case constants["a"].SAVE:
            return function(_ref2) {
                var _extends2, formInput = _ref2.formInput, parameters = _ref2.parameters, query = Object(gmail["a"])(_extends({}, formInput, {
                    service: service
                }));
                if ("" === query) return Object(notification["a"])("Specify at least one condition");
                var action = function(_ref) {
                    var archive = _ref.archive, read = _ref.read, unsubscribe = _ref.unsubscribe, remove = _ref.remove, star = _ref.star, trash = _ref.trash, target = _ref.target, action = [];
                    return unsubscribe && action.push("Unsubscribe"), remove || trash ? action.push(remove ? "Delete permanently" : "Move to Trash") : (archive && action.push("Archive"), 
                    read && action.push("Mark as read"), target && action.push('Apply label "' + target + '"'), 
                    star && action.push("Star it")), action.join(", ");
                }(formInput);
                return "" === action ? Object(notification["a"])("Select at least one action") : (Object(store["d"])(service, parameters.id, _extends({}, formInput, (actions_defineProperty(_extends2 = {}, cleanup_constants["a"].QUERY, query), 
                actions_defineProperty(_extends2, cleanup_constants["a"].ACTION, action), _extends2))), 
                CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText("Rule added successfully").setType(CardService.NotificationType.INFO)).setNavigation(Object(utils_cards["a"])(Object(cards["a"])("Rule added"))).build());
            }(e);

          case constants["a"].SEARCH:
            return Object(search["b"])(_extends({}, e, {
                service: service
            }));

          case constants["a"].RUN:
            return Object(search["a"])({
                id: e.parameters.id,
                service: service
            });

          default:
            return Object(notification["b"])("Hello!");
        }
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var cards = __webpack_require__(14), constants = __webpack_require__(0), user = __webpack_require__(5), store = __webpack_require__(2), utils = __webpack_require__(1);
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var service = constants["e"].FORWARDER, edit_getAddRuleSection = function(id) {
        var props = Object(store["b"])(service, id, {}), getInputWidget = function(fieldName, fieldTitle) {
            return CardService.newTextInput().setFieldName(fieldName).setTitle(fieldTitle).setValue(props[fieldName] || "");
        };
        return CardService.newCardSection().addWidget(CardService.newTextParagraph().setText("If all the following conditions are met:")).addWidget(function() {
            var defaultLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "", widget = CardService.newSelectionInput().setFieldName(constants["d"].LABEL).setTitle("Search").setType(CardService.SelectionInputType.DROPDOWN);
            return Object.keys(constants["f"]).forEach(function(label) {
                widget.addItem(label, constants["f"][label], constants["f"][label] === defaultLabel);
            }), Object(user["c"])().forEach(function(label) {
                widget.addItem(Object(utils["f"])(label), label, label === defaultLabel);
            }), widget;
        }(props[constants["d"].LABEL])).addWidget(getInputWidget(constants["d"].FROM, "From")).addWidget(getInputWidget(constants["d"].TO, "To")).addWidget(getInputWidget(constants["d"].SUBJECT, "Subject")).addWidget(getInputWidget(constants["d"].ADVANCED, "Advanced Search")).addWidget(CardService.newTextParagraph().setText("Do the following to the matched emails:")).addWidget(getInputWidget(constants["d"].FORWARD_TO, "Forward To")).addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText("Save").setOnClickAction(CardService.newAction().setFunctionName(constants["a"].FORWARDER).setParameters(_defineProperty({
            id: id
        }, constants["a"].KEY, constants["a"].SAVE)))).addButton(CardService.newTextButton().setText("Preview").setOnClickAction(CardService.newAction().setFunctionName(constants["a"].FORWARDER).setParameters(_defineProperty({}, constants["a"].KEY, constants["a"].SEARCH)))));
    }, search = __webpack_require__(9), notification = __webpack_require__(3), utils_cards = __webpack_require__(8), gmail = __webpack_require__(10), _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
    };
    var actions_service = constants["e"].FORWARDER, actions_actionForwardSaveRule = function(e) {
        var obj, key, value, query = Object(gmail["a"])(_extends({}, e.formInput, {
            service: actions_service
        }));
        return "" === query ? Object(notification["a"])("Please specify at least one condition") : e.formInput[constants["d"].FORWARD_TO] ? e.formInput[constants["d"].FORWARD_TO].match(/\S+@\S+/) ? (Object(store["d"])(actions_service, e.parameters.id, _extends({}, e.formInput, (obj = {}, 
        key = constants["d"].QUERY, value = query, key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj))), CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText("Rule added successfully").setType(CardService.NotificationType.INFO)).setNavigation(Object(utils_cards["a"])(Object(cards["a"])("Rule added"))).build()) : Object(notification["a"])("Please enter a valid email address") : Object(notification["a"])("Please specify the forwarding address");
    }, actions_actionForwardEditRule = function(e) {
        var card = CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle("Email Forwarder").setSubtitle("Create a Search Query")).addSection(edit_getAddRuleSection(e.parameters.id)).build();
        return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().pushCard(card)).build();
    };
    __webpack_exports__["a"] = function(e) {
        switch (e.parameters[constants["a"].KEY]) {
          case constants["a"].ADD:
          case constants["a"].EDIT:
            return actions_actionForwardEditRule(e);

          case constants["a"].DELETE:
            return id = e.parameters.id, Object(store["a"])(actions_service, id), CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText("Rule deleted").setType(CardService.NotificationType.INFO)).setNavigation(Object(utils_cards["a"])(Object(cards["a"])("Rule deleted successfully"))).build();

          case constants["a"].SAVE:
            return actions_actionForwardSaveRule(e);

          case constants["a"].SEARCH:
            return Object(search["b"])(_extends({}, e, {
                service: actions_service
            }));

          case constants["a"].RUN:
            return Object(search["a"])({
                id: e.parameters.id,
                service: actions_service
            });

          default:
            return Object(notification["b"])("Hello!");
        }
        var id;
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(global) {
        var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6), _utils_universal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18), _ui_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22), _duplicate_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19), _forwarder_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25), _merge_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20), _cleanup_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24), _responder_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23), _scheduler_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(21), _ui_auth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11);
        global.buildAddOn = _ui__WEBPACK_IMPORTED_MODULE_0__["a"], global.actionDuplicateDraft = _duplicate_actions__WEBPACK_IMPORTED_MODULE_3__["a"], 
        global.actionEmailForwarder = _forwarder_actions__WEBPACK_IMPORTED_MODULE_4__["a"], 
        global.actionMailMerge = _merge_actions__WEBPACK_IMPORTED_MODULE_5__["a"], global.actionEmailCleanup = _cleanup_actions__WEBPACK_IMPORTED_MODULE_6__["a"], 
        global.actionEmailResponder = _responder_actions__WEBPACK_IMPORTED_MODULE_7__["a"], 
        global.actionEmailStudio = _ui_actions__WEBPACK_IMPORTED_MODULE_2__["a"], global.actionEmailScheduler = _scheduler_actions__WEBPACK_IMPORTED_MODULE_8__["a"], 
        global.actionCheckAccess = _ui_auth__WEBPACK_IMPORTED_MODULE_9__["a"], global.createGmailAuthUi = _ui_auth__WEBPACK_IMPORTED_MODULE_9__["c"], 
        global.actionLogin = _ui_auth__WEBPACK_IMPORTED_MODULE_9__["b"], global.runBackgroundSendDebugLogs = _utils_universal__WEBPACK_IMPORTED_MODULE_1__["a"];
    }.call(this, __webpack_require__(27));
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || Function("return this")() || (0, eval)("this");
    } catch (e) {
        "object" == typeof window && (g = window);
    }
    module.exports = g;
} ]));