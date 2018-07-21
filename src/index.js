import { buildAddOn } from './ui';
import { runBackgroundSendDebugLogs } from './utils/universal';
import { actionEmailStudio } from './ui/actions';
import actionDuplicateDraft from './duplicate/actions';
import actionEmailForwarder from './forwarder/actions';
import actionMailMerge from './merge/actions';
import actionEmailCleanup from './cleanup/actions';
import actionEmailResponder from './responder/actions';
import actionEmailScheduler from './scheduler/actions';
import { createGmailAuthUi, actionLogin, actionCheckAccess } from './ui/auth';

/* Main Screen */
global.buildAddOn = buildAddOn;

/* Email Studio Modules */
global.actionDuplicateDraft = actionDuplicateDraft;
global.actionEmailForwarder = actionEmailForwarder;
global.actionMailMerge = actionMailMerge;
global.actionEmailCleanup = actionEmailCleanup;
global.actionEmailResponder = actionEmailResponder;
global.actionEmailStudio = actionEmailStudio;
global.actionEmailScheduler = actionEmailScheduler;

/* Gmail Authorization */
global.actionCheckAccess = actionCheckAccess;
global.createGmailAuthUi = createGmailAuthUi;
global.actionLogin = actionLogin;

/* Debug Program */
global.runBackgroundSendDebugLogs = runBackgroundSendDebugLogs;
