const DB_NAME = "training-video-pool-v2";
const DB_VERSION = 1;

const STORES = {
  videoLibrary: "videoLibrary",
  importBatches: "importBatches",
  planCycles: "planCycles",
  planDays: "planDays",
  sessionHistory: "sessionHistory",
  bodyProfiles: "bodyProfiles",
  bodySnapshots: "bodySnapshots",
  photoAssets: "photoAssets"
};

const UI_KEYS = {
  activeView: "ui.activeView",
  currentDay: "ui.currentDay",
  notifyTime: "ui.notifyTime",
  periodMode: "ui.periodMode",
  periodStart: "ui.periodStart",
  settingsOpen: "ui.settingsOpen"
};

const CATEGORY_OPTIONS = [
  { id: "standard", label: "基础矫正" },
  { id: "upper_focus", label: "上肢训练" },
  { id: "lower_focus", label: "下肢训练" },
  { id: "sculpt", label: "塑形" },
  { id: "mobility", label: "恢复与拉伸" },
  { id: "light_recovery", label: "轻恢复" }
];

const CATEGORY_LABELS = Object.fromEntries(CATEGORY_OPTIONS.map((item) => [item.id, item.label]));

const PLAN_TARGETS = {
  standard: 25,
  upper_focus: 45,
  lower_focus: 50,
  sculpt: 40,
  mobility: 22,
  light_recovery: 15
};

const PERIOD_SEQUENCE = [
  { type: "light_recovery", label: "生理期第 1 天", standardTarget: 18, primaryTarget: 12 },
  { type: "light_recovery", label: "生理期第 2 天", standardTarget: 18, primaryTarget: 12 },
  { type: "mobility", label: "生理期第 3 天", standardTarget: 18, primaryTarget: 18 },
  { type: "mobility", label: "生理期第 4 天", standardTarget: 18, primaryTarget: 18 },
  { type: "lower_focus", label: "生理期第 5 天", standardTarget: 18, primaryTarget: 20 },
  { type: "upper_focus", label: "生理期第 6 天", standardTarget: 18, primaryTarget: 20 },
  { type: "lower_focus", label: "生理期第 7 天", standardTarget: 18, primaryTarget: 20 }
];

const WEEK_A = ["lower_focus", "mobility", "upper_focus", "sculpt", "light_recovery", "lower_focus", "upper_focus"];
const WEEK_B = ["lower_focus", "mobility", "upper_focus", "sculpt", "light_recovery", "lower_focus", "sculpt"];
const BASE_PRIMARY_TYPES = [...WEEK_A, ...WEEK_B, ...WEEK_A, ...WEEK_B];

const MIN_VIDEO_COUNTS = {
  standard: 3,
  upper_focus: 2,
  lower_focus: 2,
  sculpt: 2,
  recoveryCombined: 3
};

const FALLBACK_VIDEOS = [
  {
    videoId: "fallback:foot",
    canonicalUrl: "https://www.bilibili.com/video/BV1ofKEzjEUd",
    rawUrl: "https://www.bilibili.com/video/BV1ofKEzjEUd",
    title: "足弓重建 4.0",
    folder: "内置兜底",
    estimatedDurationMin: 20,
    confirmedCategory: "standard",
    sourceType: "fallback",
    description: "足弓激活、足底控制与步态稳定。"
  },
  {
    videoId: "fallback:breath",
    canonicalUrl: "https://www.bilibili.com/video/BV1MurfB2E4Q",
    rawUrl: "https://www.bilibili.com/video/BV1MurfB2E4Q?t=292.4",
    title: "9090 呼吸法",
    folder: "内置兜底",
    estimatedDurationMin: 10,
    confirmedCategory: "standard",
    sourceType: "fallback",
    description: "建立腹压，稳定核心与骨盆。"
  },
  {
    videoId: "fallback:thoracic",
    canonicalUrl: "https://www.bilibili.com/video/BV1qQULYPENn",
    rawUrl: "https://www.bilibili.com/video/BV1qQULYPENn",
    title: "胸椎灵活度提升",
    folder: "内置兜底",
    estimatedDurationMin: 10,
    confirmedCategory: "standard",
    sourceType: "fallback",
    description: "改善胸椎僵硬与圆肩驼背代偿。"
  },
  {
    videoId: "fallback:upper1",
    canonicalUrl: "https://www.bilibili.com/video/BV1Gz421C7G1",
    rawUrl: "https://www.bilibili.com/video/BV1Gz421C7G1",
    title: "15 分钟丝滑美背",
    folder: "内置兜底",
    estimatedDurationMin: 15,
    confirmedCategory: "upper_focus",
    sourceType: "fallback",
    description: "肩背线条与头前伸修正。"
  },
  {
    videoId: "fallback:upper2",
    canonicalUrl: "https://www.bilibili.com/video/BV1qQc4zxEsi",
    rawUrl: "https://www.bilibili.com/video/BV1qQc4zxEsi",
    title: "30 分钟 Barre 上肢雕刻",
    folder: "内置兜底",
    estimatedDurationMin: 30,
    confirmedCategory: "upper_focus",
    sourceType: "fallback",
    description: "上背、肩带与手臂线条训练。"
  },
  {
    videoId: "fallback:lower1",
    canonicalUrl: "https://www.bilibili.com/video/BV1PhHrzfEqN",
    rawUrl: "https://www.bilibili.com/video/BV1PhHrzfEqN",
    title: "20 分钟大腿内侧 x 骨盆稳定",
    folder: "内置兜底",
    estimatedDurationMin: 20,
    confirmedCategory: "lower_focus",
    sourceType: "fallback",
    description: "臀腿稳定、内收链与盆底控制。"
  },
  {
    videoId: "fallback:lower2",
    canonicalUrl: "https://www.bilibili.com/video/BV1hTWBzvEXn",
    rawUrl: "https://www.bilibili.com/video/BV1hTWBzvEXn",
    title: "30 分钟 Barre 臀腿紧致",
    folder: "内置兜底",
    estimatedDurationMin: 30,
    confirmedCategory: "lower_focus",
    sourceType: "fallback",
    description: "下肢耐力与腰腹核心整合。"
  },
  {
    videoId: "fallback:sculpt1",
    canonicalUrl: "https://www.bilibili.com/video/BV1FczFBcEBQ",
    rawUrl: "https://www.bilibili.com/video/BV1FczFBcEBQ",
    title: "30 分钟 Barre 站立臀腿雕刻",
    folder: "内置兜底",
    estimatedDurationMin: 30,
    confirmedCategory: "sculpt",
    sourceType: "fallback",
    description: "站立塑形与耐力提升。"
  },
  {
    videoId: "fallback:sculpt2",
    canonicalUrl: "https://www.bilibili.com/video/BV11Autz4EoV",
    rawUrl: "https://www.bilibili.com/video/BV11Autz4EoV",
    title: "20 分钟 Barre 手臂薄背",
    folder: "内置兜底",
    estimatedDurationMin: 20,
    confirmedCategory: "sculpt",
    sourceType: "fallback",
    description: "快速塑形补充训练。"
  },
  {
    videoId: "fallback:mobility1",
    canonicalUrl: "https://www.bilibili.com/video/BV1frcAevEp9",
    rawUrl: "https://www.bilibili.com/video/BV1frcAevEp9",
    title: "髋关节灵活度训练",
    folder: "内置兜底",
    estimatedDurationMin: 10,
    confirmedCategory: "mobility",
    sourceType: "fallback",
    description: "髋部活动度与下肢代偿恢复。"
  },
  {
    videoId: "fallback:mobility2",
    canonicalUrl: "https://www.bilibili.com/video/BV1UovWBNENi",
    rawUrl: "https://www.bilibili.com/video/BV1UovWBNENi",
    title: "睡前胸椎 x 髋部筋膜拉伸",
    folder: "内置兜底",
    estimatedDurationMin: 10,
    confirmedCategory: "mobility",
    sourceType: "fallback",
    description: "低强度放松胸椎与髋部。"
  },
  {
    videoId: "fallback:recovery1",
    canonicalUrl: "https://www.bilibili.com/video/BV1uCoRYHE1v",
    rawUrl: "https://www.bilibili.com/video/BV1uCoRYHE1v",
    title: "坐姿 10 分钟圆肩驼背矫正",
    folder: "内置兜底",
    estimatedDurationMin: 10,
    confirmedCategory: "light_recovery",
    sourceType: "fallback",
    description: "低门槛上肢姿态修正。"
  },
  {
    videoId: "fallback:recovery2",
    canonicalUrl: "https://www.bilibili.com/video/BV1MurfB2E4Q",
    rawUrl: "https://www.bilibili.com/video/BV1MurfB2E4Q?t=292.4",
    title: "呼吸放松收尾",
    folder: "内置兜底",
    estimatedDurationMin: 10,
    confirmedCategory: "light_recovery",
    sourceType: "fallback",
    description: "低强度呼吸和神经系统放松。"
  }
];

const FALLBACK_MAP = new Map(FALLBACK_VIDEOS.map((video) => [video.videoId, video]));

const state = {
  db: null,
  ready: false,
  videos: [],
  importBatches: [],
  planCycles: [],
  planDays: [],
  sessions: [],
  bodyProfile: { id: "primary", heightCm: "" },
  bodySnapshots: [],
  photoAssets: [],
  currentCycle: null,
  planWarnings: [],
  activeView: localStorage.getItem(UI_KEYS.activeView) || "today",
  currentDayOverride: Number(localStorage.getItem(UI_KEYS.currentDay) || 0),
  notifyTime: localStorage.getItem(UI_KEYS.notifyTime) || "",
  periodMode: localStorage.getItem(UI_KEYS.periodMode) === "1",
  periodStart: Number(localStorage.getItem(UI_KEYS.periodStart) || 1),
  reviewSelections: {},
  libraryFilters: {
    search: "",
    status: "all",
    category: "all"
  },
  planEditor: null,
  freeMixer: {
    selectedVideoIds: [],
    saveDay: 1,
    saveMode: "replace"
  },
  deferredPrompt: null,
  toastTimer: null,
  objectUrls: new Map(),
  lastNotifyKey: ""
};

const els = {
  progressBar: document.getElementById("progressBar"),
  progressText: document.getElementById("progressText"),
  activeCycleText: document.getElementById("activeCycleText"),
  topbarSubtle: document.getElementById("topbarSubtle"),
  toggleSettingsBtn: document.getElementById("toggleSettingsBtn"),
  settingsPanel: document.getElementById("settingsPanel"),
  installBtn: document.getElementById("installBtn"),
  notifyTimeInput: document.getElementById("notifyTimeInput"),
  periodModeInput: document.getElementById("periodModeInput"),
  periodStartInput: document.getElementById("periodStartInput"),
  saveReminderBtn: document.getElementById("saveReminderBtn"),
  todayMetrics: document.getElementById("todayMetrics"),
  todayHero: document.getElementById("todayHero"),
  todayPlan: document.getElementById("todayPlan"),
  planWarnings: document.getElementById("planWarnings"),
  planEditorPanel: document.getElementById("planEditorPanel"),
  planList: document.getElementById("planList"),
  csvInput: document.getElementById("csvInput"),
  importSummary: document.getElementById("importSummary"),
  pendingReviewPanel: document.getElementById("pendingReviewPanel"),
  freeMixerPanel: document.getElementById("freeMixerPanel"),
  librarySearchInput: document.getElementById("librarySearchInput"),
  libraryStatusFilter: document.getElementById("libraryStatusFilter"),
  libraryCategoryFilter: document.getElementById("libraryCategoryFilter"),
  libraryList: document.getElementById("libraryList"),
  storageSummary: document.getElementById("storageSummary"),
  profileForm: document.getElementById("profileForm"),
  snapshotForm: document.getElementById("snapshotForm"),
  trendChart: document.getElementById("trendChart"),
  feedbackSummary: document.getElementById("feedbackSummary"),
  snapshotList: document.getElementById("snapshotList"),
  toast: document.getElementById("toast"),
  views: Array.from(document.querySelectorAll(".view")),
  navButtons: Array.from(document.querySelectorAll(".nav-btn"))
};

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    els.toast.classList.add("hidden");
  }, 2600);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(dateLike) {
  if (!dateLike) return "-";
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) return String(dateLike);
  return date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
}

function formatDateTime(dateLike) {
  if (!dateLike) return "-";
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) return String(dateLike);
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatMinutes(value) {
  return `${Math.round(value || 0)} 分钟`;
}

function bytesToMB(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function unique(array) {
  return Array.from(new Set(array.filter(Boolean)));
}

function sumBy(items, getValue) {
  return items.reduce((total, item) => total + Number(getValue(item) || 0), 0);
}

function getTodayIso() {
  return new Date().toISOString().slice(0, 10);
}

function extractBV(url) {
  const match = String(url || "").match(/BV[0-9A-Za-z]+/i);
  return match ? match[0].toUpperCase() : "";
}

function normalizeUrl(rawUrl) {
  try {
    const url = new URL(String(rawUrl || "").trim());
    url.hash = "";
    if (extractBV(url.href)) {
      return `https://www.bilibili.com/video/${extractBV(url.href)}`;
    }
    url.search = "";
    return url.toString();
  } catch (error) {
    return String(rawUrl || "").trim();
  }
}

function getVideoIdFromRecord(record) {
  const bv = extractBV(record.url);
  if (bv) return `bv:${bv}`;
  return `url:${normalizeUrl(record.url)}`;
}

function parseEstimatedDuration(text) {
  const value = String(text || "");
  const match = value.match(/(\d{1,3})(?:\s*)(分钟|min|mins|minute|分)/i);
  if (!match) return null;
  const minutes = Number(match[1]);
  return minutes > 0 ? minutes : null;
}

function defaultDurationByCategory(category) {
  switch (category) {
    case "standard":
      return 15;
    case "upper_focus":
    case "lower_focus":
    case "sculpt":
      return 25;
    case "mobility":
      return 15;
    case "light_recovery":
      return 10;
    default:
      return 15;
  }
}

function classifyVideo(record) {
  const text = `${record.title || ""} ${(record.folder || "")}`.toLowerCase();
  const scoring = {
    standard: { score: 0, reasons: [] },
    upper_focus: { score: 0, reasons: [] },
    lower_focus: { score: 0, reasons: [] },
    sculpt: { score: 0, reasons: [] },
    mobility: { score: 0, reasons: [] },
    light_recovery: { score: 0, reasons: [] }
  };

  const addScore = (category, weight, keyword) => {
    scoring[category].score += weight;
    if (keyword && !scoring[category].reasons.includes(keyword)) {
      scoring[category].reasons.push(keyword);
    }
  };

  const rules = [
    ["standard", 5, ["足弓", "呼吸", "体态", "矫正", "胸椎", "核心", "骨盆", "头前伸"]],
    ["upper_focus", 5, ["上肢", "肩", "背", "薄背", "手臂", "圆肩", "驼背", "美背"]],
    ["lower_focus", 5, ["下肢", "臀腿", "腿", "膝", "大腿", "小腿", "髋", "盆底", "臀"]],
    ["sculpt", 6, ["barre", "芭杆", "塑形", "雕刻", "燃脂", "紧致"]],
    ["mobility", 6, ["灵活", "活动度", "拉伸", "筋膜", "伸展", "放松", "mobility"]],
    ["light_recovery", 6, ["恢复", "睡前", "低强度", "舒缓", "放松", "呼吸放松"]]
  ];

  rules.forEach(([category, weight, keywords]) => {
    keywords.forEach((keyword) => {
      if (text.includes(String(keyword).toLowerCase())) addScore(category, weight, keyword);
    });
  });

  if (text.includes("普拉提")) {
    addScore("standard", 2, "普拉提");
    addScore("lower_focus", 1, "普拉提");
  }
  if (text.includes("塑形")) addScore("sculpt", 3, "塑形");
  if (text.includes("收藏") || text.includes("合集")) addScore("mobility", 1, "合集");

  const top = Object.entries(scoring).sort((a, b) => {
    if (b[1].score !== a[1].score) return b[1].score - a[1].score;
    return CATEGORY_OPTIONS.findIndex((item) => item.id === a[0]) - CATEGORY_OPTIONS.findIndex((item) => item.id === b[0]);
  })[0];

  const category = top && top[1].score > 0 ? top[0] : "standard";
  const reasons = scoring[category].reasons.length ? scoring[category].reasons.slice(0, 3) : ["默认归入基础矫正"];
  return {
    category,
    reason: `命中关键词：${reasons.join(" / ")}`
  };
}

function getStatusLabel(status) {
  if (status === "active") return "激活中";
  if (status === "archived") return "已归档";
  if (status === "pending_review") return "待确认";
  return status || "-";
}

function getTypeFocus(type) {
  const map = {
    standard: "姿态基础、呼吸与骨盆控制",
    upper_focus: "肩背线条与上肢姿态",
    lower_focus: "下肢稳定、臀腿与骨盆",
    sculpt: "Barre 风格塑形强化",
    mobility: "活动度与恢复",
    light_recovery: "低强度收尾与恢复",
    manual: "手动组合"
  };
  return map[type] || "自定义训练";
}

function getVideoUsageSeed(video) {
  return {
    planTimesUsed: Number(video?.usage?.planTimesUsed || 0),
    planLastUsedAt: video?.usage?.planLastUsedAt || "",
    freeTimesUsed: Number(video?.usage?.freeTimesUsed || 0),
    freeLastUsedAt: video?.usage?.freeLastUsedAt || ""
  };
}

function parseCsv(text) {
  const rows = [];
  let cell = "";
  let row = [];
  let inQuotes = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      cell = "";
      if (row.some((value) => String(value).trim() !== "")) rows.push(row);
      row = [];
    } else {
      cell += char;
    }
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    if (row.some((value) => String(value).trim() !== "")) rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0].map((value) => String(value).trim());
  return rows.slice(1).map((values) => {
    const result = {};
    headers.forEach((header, index) => {
      result[header] = String(values[index] || "").trim();
    });
    return result;
  });
}

function makeStoreRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORES.videoLibrary)) db.createObjectStore(STORES.videoLibrary, { keyPath: "videoId" });
      if (!db.objectStoreNames.contains(STORES.importBatches)) db.createObjectStore(STORES.importBatches, { keyPath: "batchId" });
      if (!db.objectStoreNames.contains(STORES.planCycles)) db.createObjectStore(STORES.planCycles, { keyPath: "cycleId" });
      if (!db.objectStoreNames.contains(STORES.planDays)) db.createObjectStore(STORES.planDays, { keyPath: "key" });
      if (!db.objectStoreNames.contains(STORES.sessionHistory)) db.createObjectStore(STORES.sessionHistory, { keyPath: "sessionId" });
      if (!db.objectStoreNames.contains(STORES.bodyProfiles)) db.createObjectStore(STORES.bodyProfiles, { keyPath: "id" });
      if (!db.objectStoreNames.contains(STORES.bodySnapshots)) db.createObjectStore(STORES.bodySnapshots, { keyPath: "snapshotId" });
      if (!db.objectStoreNames.contains(STORES.photoAssets)) db.createObjectStore(STORES.photoAssets, { keyPath: "photoId" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAll(storeName) {
  const tx = state.db.transaction(storeName, "readonly");
  return makeStoreRequest(tx.objectStore(storeName).getAll());
}

async function putRecord(storeName, record) {
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function putMany(storeName, records) {
  if (!records.length) return;
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    records.forEach((record) => store.put(record));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function deleteRecord(storeName, key) {
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function sortByDateDesc(items, key) {
  return items.slice().sort((a, b) => {
    const left = String(a[key] || "");
    const right = String(b[key] || "");
    return right.localeCompare(left);
  });
}

async function refreshState() {
  const [videos, importBatches, planCycles, planDays, sessions, bodyProfiles, bodySnapshots, photoAssets] = await Promise.all([
    getAll(STORES.videoLibrary),
    getAll(STORES.importBatches),
    getAll(STORES.planCycles),
    getAll(STORES.planDays),
    getAll(STORES.sessionHistory),
    getAll(STORES.bodyProfiles),
    getAll(STORES.bodySnapshots),
    getAll(STORES.photoAssets)
  ]);

  state.videos = videos.sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")));
  state.importBatches = sortByDateDesc(importBatches, "importedAt");
  state.planCycles = sortByDateDesc(planCycles, "startDate");
  state.planDays = planDays.sort((a, b) => {
    if (a.cycleId !== b.cycleId) return String(b.cycleId).localeCompare(String(a.cycleId));
    return Number(a.day) - Number(b.day);
  });
  state.sessions = sortByDateDesc(sessions, "completedAt");
  state.bodyProfile = bodyProfiles.find((item) => item.id === "primary") || { id: "primary", heightCm: "" };
  state.bodySnapshots = sortByDateDesc(bodySnapshots, "date");
  state.photoAssets = photoAssets.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  state.currentCycle = selectCurrentCycle();
  state.planWarnings = getPlanWarnings();
  state.freeMixer.selectedVideoIds = state.freeMixer.selectedVideoIds.filter((videoId) =>
    state.videos.some((video) => video.videoId === videoId && video.status === "active")
  );
  if (state.planEditor) {
    state.planEditor.selectedVideoIds = state.planEditor.selectedVideoIds.filter((videoId) =>
      state.videos.some((video) => video.videoId === videoId && video.status === "active")
    );
  }
}

function selectCurrentCycle() {
  const current = state.planCycles.find((cycle) => cycle.status === "current");
  if (current) return current;
  return state.planCycles[0] || null;
}

function getCyclePlanDays(cycleId) {
  return state.planDays.filter((day) => day.cycleId === cycleId).sort((a, b) => a.day - b.day);
}

function getReferencedVideoIds() {
  const ids = [];
  state.planDays.forEach((day) => {
    ids.push(...day.standardVideoIds, ...day.focusVideoIds);
    if (day.manualOverride?.videoIds?.length) ids.push(...day.manualOverride.videoIds);
  });
  return new Set(ids);
}

function getVideoById(videoId) {
  return state.videos.find((video) => video.videoId === videoId) || FALLBACK_MAP.get(videoId) || null;
}

function getDurationOfVideo(videoId) {
  const video = getVideoById(videoId);
  return Number(video?.estimatedDurationMin || 0);
}

function estimateVideoIds(videoIds) {
  return sumBy(videoIds, (videoId) => getDurationOfVideo(videoId));
}

function getAllDayVideoIds(day) {
  const manual = day.manualOverride;
  if (manual?.mode === "replace") return unique(manual.videoIds || []);
  if (manual?.mode === "append") return unique([...day.standardVideoIds, ...day.focusVideoIds, ...(manual.videoIds || [])]);
  return unique([...day.standardVideoIds, ...day.focusVideoIds]);
}

function getActiveVideosByCategory(category) {
  return state.videos.filter((video) => video.status === "active" && video.confirmedCategory === category);
}

function getPlanWarnings() {
  const counts = {
    standard: getActiveVideosByCategory("standard").length,
    upper_focus: getActiveVideosByCategory("upper_focus").length,
    lower_focus: getActiveVideosByCategory("lower_focus").length,
    sculpt: getActiveVideosByCategory("sculpt").length,
    recoveryCombined: getActiveVideosByCategory("mobility").length + getActiveVideosByCategory("light_recovery").length
  };
  const warnings = [];
  if (counts.standard < MIN_VIDEO_COUNTS.standard) warnings.push(`基础矫正视频不足 ${MIN_VIDEO_COUNTS.standard} 个，标准块会高频重复。`);
  if (counts.upper_focus < MIN_VIDEO_COUNTS.upper_focus) warnings.push(`上肢视频不足 ${MIN_VIDEO_COUNTS.upper_focus} 个，计划会更多依赖内置兜底。`);
  if (counts.lower_focus < MIN_VIDEO_COUNTS.lower_focus) warnings.push(`下肢视频不足 ${MIN_VIDEO_COUNTS.lower_focus} 个，计划会更多依赖内置兜底。`);
  if (counts.sculpt < MIN_VIDEO_COUNTS.sculpt) warnings.push(`塑形视频不足 ${MIN_VIDEO_COUNTS.sculpt} 个，Barre 比例会由内置视频补齐。`);
  if (counts.recoveryCombined < MIN_VIDEO_COUNTS.recoveryCombined) warnings.push(`恢复类视频不足 ${MIN_VIDEO_COUNTS.recoveryCombined} 个，mobility / light recovery 会重复出现。`);
  return warnings;
}

function sortCandidates(candidates, recentIds, scheduledCounts) {
  return candidates.slice().sort((left, right) => {
    const leftRecent = recentIds.has(left.videoId) ? 1 : 0;
    const rightRecent = recentIds.has(right.videoId) ? 1 : 0;
    if (leftRecent !== rightRecent) return leftRecent - rightRecent;

    const leftBaseUsage = Number(left.usage?.planTimesUsed || 0) + Number(scheduledCounts[left.videoId] || 0);
    const rightBaseUsage = Number(right.usage?.planTimesUsed || 0) + Number(scheduledCounts[right.videoId] || 0);
    if (leftBaseUsage !== rightBaseUsage) return leftBaseUsage - rightBaseUsage;

    const leftLast = left.usage?.planLastUsedAt || "";
    const rightLast = right.usage?.planLastUsedAt || "";
    if (leftLast !== rightLast) return leftLast.localeCompare(rightLast);

    return Number(right.estimatedDurationMin || 0) - Number(left.estimatedDurationMin || 0);
  });
}

function selectVideosForTarget({ category, target, recentIds, scheduledCounts, excludedIds }) {
  const recentSet = new Set(recentIds || []);
  const excluded = new Set(excludedIds || []);
  const imported = sortCandidates(
    getActiveVideosByCategory(category).filter((video) => !excluded.has(video.videoId)),
    recentSet,
    scheduledCounts
  );
  const fallback = sortCandidates(
    FALLBACK_VIDEOS.filter((video) => video.confirmedCategory === category && !excluded.has(video.videoId)),
    recentSet,
    scheduledCounts
  );
  const selected = [];
  let total = 0;
  let usedFallback = false;

  const tryPickFrom = (pool, markFallback) => {
    for (const video of pool) {
      if (selected.includes(video.videoId)) continue;
      if (total >= target && selected.length) break;
      selected.push(video.videoId);
      total += Number(video.estimatedDurationMin || 0);
      if (markFallback) usedFallback = true;
    }
  };

  const nonRecentImported = imported.filter((video) => !recentSet.has(video.videoId));
  const recentImported = imported.filter((video) => recentSet.has(video.videoId));
  tryPickFrom(nonRecentImported, false);
  if (total < target) tryPickFrom(recentImported, false);

  if (total < target) {
    const nonRecentFallback = fallback.filter((video) => !recentSet.has(video.videoId));
    const recentFallback = fallback.filter((video) => recentSet.has(video.videoId));
    tryPickFrom(nonRecentFallback, true);
    if (total < target) tryPickFrom(recentFallback, true);
  }

  return {
    videoIds: unique(selected),
    totalMinutes: estimateVideoIds(selected),
    usedFallback
  };
}

function buildDayRecord(cycleId, day, primaryType, seedRecentIds, scheduledCounts) {
  const standardPick = selectVideosForTarget({
    category: "standard",
    target: PLAN_TARGETS.standard,
    recentIds: seedRecentIds,
    scheduledCounts,
    excludedIds: []
  });

  const focusPick = selectVideosForTarget({
    category: primaryType,
    target: PLAN_TARGETS[primaryType],
    recentIds: unique([...seedRecentIds, ...standardPick.videoIds]),
    scheduledCounts,
    excludedIds: standardPick.videoIds
  });

  const allIds = unique([...standardPick.videoIds, ...focusPick.videoIds]);
  allIds.forEach((videoId) => {
    scheduledCounts[videoId] = Number(scheduledCounts[videoId] || 0) + 1;
  });

  return {
    key: `${cycleId}:${day}`,
    cycleId,
    day,
    primaryType,
    standardVideoIds: standardPick.videoIds,
    focusVideoIds: focusPick.videoIds,
    estimatedTimeMin: estimateVideoIds(allIds),
    focus: getTypeFocus(primaryType),
    usedFallback: Boolean(standardPick.usedFallback || focusPick.usedFallback),
    manualOverride: null,
    locked: false,
    completedAt: "",
    createdAt: new Date().toISOString()
  };
}

async function archiveCurrentCycleIfNeeded() {
  if (!state.currentCycle) return [];
  const current = { ...state.currentCycle, status: "archived", archivedAt: new Date().toISOString() };
  const currentDays = getCyclePlanDays(current.cycleId);
  const seedIds = unique(
    currentDays
      .slice(-3)
      .flatMap((day) => getAllDayVideoIds(day))
  );
  await putRecord(STORES.planCycles, current);
  return seedIds;
}

async function createNewCycle() {
  const seedIds = await archiveCurrentCycleIfNeeded();
  const cycleId = `cycle_${Date.now()}`;
  const scheduledCounts = {};
  const generatedDays = [];
  const recentQueue = seedIds.length ? [seedIds] : [];

  for (let index = 0; index < BASE_PRIMARY_TYPES.length; index += 1) {
    const recentIds = unique(recentQueue.flat());
    const dayRecord = buildDayRecord(cycleId, index + 1, BASE_PRIMARY_TYPES[index], recentIds, scheduledCounts);
    generatedDays.push(dayRecord);
    recentQueue.push(getAllDayVideoIds(dayRecord));
    if (recentQueue.length > 3) recentQueue.shift();
  }

  const cycle = {
    cycleId,
    startDate: getTodayIso(),
    status: "current",
    seededCooldownVideoIds: seedIds,
    archivedAt: ""
  };

  await putRecord(STORES.planCycles, cycle);
  await putMany(STORES.planDays, generatedDays);
  await refreshState();
  state.currentDayOverride = 0;
  localStorage.removeItem(UI_KEYS.currentDay);
  showToast("已生成新的 28 天训练周期。");
}

function getActiveCycleStartDate() {
  return state.currentCycle?.startDate || getTodayIso();
}

function getCurrentDayNumber() {
  if (!state.currentCycle) return 1;
  if (state.currentDayOverride >= 1 && state.currentDayOverride <= 28) return state.currentDayOverride;
  const start = new Date(getActiveCycleStartDate());
  const today = new Date();
  const diff = Math.floor((today.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)) / 86400000);
  return clamp(diff + 1, 1, 28);
}

function getPeriodSettings() {
  return {
    enabled: state.periodMode,
    startDay: clamp(Number(state.periodStart || 1), 1, 28)
  };
}

function applyDisplayOverrides(day, recentQueue, scheduledCounts) {
  const completedAt = day.completedAt || "";
  const period = getPeriodSettings();
  if (day.manualOverride?.mode === "replace") {
    const videoIds = unique(day.manualOverride.videoIds || []);
    return {
      ...day,
      completedAt,
      standardIds: [],
      focusIds: videoIds,
      extraIds: [],
      primaryLabel: "手动替换",
      note: "这一天已使用手动替换，不会被自动重排或生理期模式覆盖。",
      estimatedTimeMin: estimateVideoIds(videoIds),
      isManual: true,
      isPeriod: false,
      allIds: videoIds
    };
  }

  if (day.manualOverride?.mode === "append") {
    const baseIds = unique([...day.standardVideoIds, ...day.focusVideoIds]);
    const extraIds = unique(day.manualOverride.videoIds || []);
    return {
      ...day,
      completedAt,
      standardIds: day.standardVideoIds.slice(),
      focusIds: day.focusVideoIds.slice(),
      extraIds,
      primaryLabel: CATEGORY_LABELS[day.primaryType],
      note: "这一天已追加手动视频。",
      estimatedTimeMin: estimateVideoIds(unique([...baseIds, ...extraIds])),
      isManual: true,
      isPeriod: false,
      allIds: unique([...baseIds, ...extraIds])
    };
  }

  const periodOffset = day.day - period.startDay;
  if (period.enabled && periodOffset >= 0 && periodOffset < PERIOD_SEQUENCE.length) {
    const sequence = PERIOD_SEQUENCE[periodOffset];
    const recentIds = unique(recentQueue.flat());
    const standardPick = selectVideosForTarget({
      category: "standard",
      target: sequence.standardTarget,
      recentIds,
      scheduledCounts,
      excludedIds: []
    });
    const focusPick = selectVideosForTarget({
      category: sequence.type,
      target: sequence.primaryTarget,
      recentIds: unique([...recentIds, ...standardPick.videoIds]),
      scheduledCounts,
      excludedIds: standardPick.videoIds
    });
    const allIds = unique([...standardPick.videoIds, ...focusPick.videoIds]);
    allIds.forEach((videoId) => {
      scheduledCounts[videoId] = Number(scheduledCounts[videoId] || 0) + 1;
    });
    return {
      ...day,
      completedAt,
      primaryType: sequence.type,
      standardIds: standardPick.videoIds,
      focusIds: focusPick.videoIds,
      extraIds: [],
      primaryLabel: sequence.label,
      note: "生理期替换已启用，只替换自动生成部分。",
      estimatedTimeMin: estimateVideoIds(allIds),
      isManual: false,
      isPeriod: true,
      allIds
    };
  }

  const allIds = unique([...day.standardVideoIds, ...day.focusVideoIds]);
  return {
    ...day,
    completedAt,
    standardIds: day.standardVideoIds.slice(),
    focusIds: day.focusVideoIds.slice(),
    extraIds: [],
    primaryLabel: CATEGORY_LABELS[day.primaryType],
    note: "",
    estimatedTimeMin: estimateVideoIds(allIds),
    isManual: false,
    isPeriod: false,
    allIds
  };
}

function getDisplayPlanDays() {
  if (!state.currentCycle) return [];
  const baseDays = getCyclePlanDays(state.currentCycle.cycleId);
  const recentQueue = (state.currentCycle.seededCooldownVideoIds || []).length ? [state.currentCycle.seededCooldownVideoIds || []] : [];
  const scheduledCounts = {};
  const displayDays = [];

  baseDays.forEach((day) => {
    const display = applyDisplayOverrides(day, recentQueue, scheduledCounts);
    displayDays.push(display);
    recentQueue.push(display.allIds);
    if (recentQueue.length > 3) recentQueue.shift();
  });

  return displayDays;
}

function computePlanStats(displayDays) {
  const currentDay = getCurrentDayNumber();
  const doneDays = displayDays.filter((day) => day.completedAt).length;
  const completionRate = displayDays.length ? Math.round((doneDays / displayDays.length) * 100) : 0;
  const weekStart = Math.floor((currentDay - 1) / 7) * 7;
  const weekDays = displayDays.slice(weekStart, weekStart + 7);
  const weeklyMinutes = sumBy(weekDays, (day) => day.estimatedTimeMin);
  const weeklyCompletedVideos = sumBy(
    weekDays.filter((day) => day.completedAt),
    (day) => day.allIds.length
  );
  let streak = 0;
  displayDays.forEach((day) => {
    if (day.completedAt) streak += 1;
    else streak = 0;
  });
  return {
    currentDay,
    doneDays,
    completionRate,
    weeklyMinutes,
    weeklyCompletedVideos,
    streak,
    totalImportedVideos: state.videos.length,
    activeVideos: state.videos.filter((video) => video.status === "active").length,
    pendingVideos: state.videos.filter((video) => video.status === "pending_review").length,
    freeSessions: state.sessions.filter((session) => session.source === "free").length
  };
}

function renderMetricCards(stats) {
  els.todayMetrics.innerHTML = [
    { label: "当前周期完成率", value: `${stats.completionRate}%`, sub: `${stats.doneDays} / 28 天` },
    { label: "本周计划时长", value: `${stats.weeklyMinutes}`, sub: "分钟" },
    { label: "本周已完成视频", value: `${stats.weeklyCompletedVideos}`, sub: "个" },
    { label: "连续打卡天数", value: `${stats.streak}`, sub: "天" }
  ].map((item) => `
    <article class="metric-card">
      <div class="subtle">${escapeHtml(item.label)}</div>
      <strong>${escapeHtml(item.value)}</strong>
      <div class="tiny">${escapeHtml(item.sub)}</div>
    </article>
  `).join("");
}

function renderTopbar(stats) {
  els.progressBar.style.width = `${stats.completionRate}%`;
  els.progressText.textContent = `${stats.doneDays} / 28（${stats.completionRate}%）`;
  els.activeCycleText.textContent = state.currentCycle ? `起始日 ${formatDate(state.currentCycle.startDate)}` : "未生成周期";
  els.topbarSubtle.textContent = `当前视频池 ${stats.activeVideos} 个激活视频，待确认 ${stats.pendingVideos} 个，自由训练 ${stats.freeSessions} 次。`;
  els.notifyTimeInput.value = state.notifyTime;
  els.periodModeInput.checked = state.periodMode;
  els.periodStartInput.value = String(state.periodStart || 1);
}

function renderToday(displayDays, stats) {
  renderMetricCards(stats);
  const today = displayDays[stats.currentDay - 1];
  if (!today) {
    els.todayHero.innerHTML = `<section class="hero-card"><p class="empty">还没有可用周期，先在计划页生成一个 28 天计划。</p></section>`;
    els.todayPlan.innerHTML = "";
    return;
  }
  els.todayHero.innerHTML = `
    <section class="hero-card">
      <div class="today-hero-row">
        <div>
          <div class="eyebrow">Today / Day ${today.day}</div>
          <h2>${escapeHtml(today.primaryLabel)}</h2>
          <p class="subtle">${escapeHtml(today.focus || getTypeFocus(today.primaryType))}</p>
          <div class="badge-list" style="margin-top:12px;">
            <span class="pill">${escapeHtml(formatMinutes(today.estimatedTimeMin))}</span>
            <span class="pill ${today.completedAt ? "ok" : ""}">${today.completedAt ? "已完成" : "未完成"}</span>
            <span class="pill ${today.isPeriod ? "warn" : ""}">${today.isPeriod ? "生理期替换中" : "标准计划"}</span>
          </div>
        </div>
        <div class="today-actions">
          <button type="button" data-action="${today.completedAt ? "mark-day-undone" : "mark-day-done"}" data-day="${today.day}">
            ${today.completedAt ? "取消完成" : "完成今日"}
          </button>
          <button type="button" class="secondary" data-action="switch-view" data-view="plan">查看全计划</button>
        </div>
      </div>
      ${today.note ? `<div class="warning-box" style="margin-top:14px;">${escapeHtml(today.note)}</div>` : ""}
    </section>
  `;
  els.todayPlan.innerHTML = renderDayCard(today, true);
}

function renderVideoItems(videoIds, selectableScope) {
  if (!videoIds.length) return `<div class="empty">暂无视频。</div>`;
  return videoIds.map((videoId) => {
    const video = getVideoById(videoId);
    const checked = selectableScope === "free"
      ? state.freeMixer.selectedVideoIds.includes(videoId)
      : selectableScope === "editor"
        ? state.planEditor?.selectedVideoIds?.includes(videoId)
        : false;
    return `
      <div class="video-item">
        <div class="library-row-head">
          <div>
            <div class="video-title">${escapeHtml(video?.title || videoId)}</div>
            <div class="video-desc">${escapeHtml(video?.description || video?.folder || "")}</div>
          </div>
          <div class="badge-list">
            <span class="pill">${escapeHtml(CATEGORY_LABELS[video?.confirmedCategory] || "兜底")}</span>
            <span class="pill">${escapeHtml(formatMinutes(video?.estimatedDurationMin || 0))}</span>
            <span class="pill ${video?.sourceType === "fallback" ? "warn" : ""}">${video?.sourceType === "fallback" ? "内置兜底" : "视频池"}</span>
          </div>
        </div>
        <div class="library-actions">
          <button type="button" class="ghost" data-action="open-video" data-video-id="${escapeHtml(videoId)}">打开视频</button>
          ${selectableScope ? `
            <label class="selection-row">
              <input type="checkbox" data-action="${selectableScope === "free" ? "toggle-free-video" : "toggle-editor-video"}" data-video-id="${escapeHtml(videoId)}" ${checked ? "checked" : ""} />
              <span>${selectableScope === "free" ? "加入自由搭配" : "加入手动改天"}</span>
            </label>
          ` : ""}
        </div>
      </div>
    `;
  }).join("");
}

function renderDayCard(day, single = false) {
  return `
    <section class="day-card ${day.completedAt ? "done" : ""} ${day.isPeriod ? "period" : ""} ${day.isManual ? "manual" : ""}">
      <div class="day-header">
        <div>
          <div class="eyebrow">Day ${day.day}</div>
          <h3>${escapeHtml(day.primaryLabel)}</h3>
          <p class="subtle">${escapeHtml(day.focus || getTypeFocus(day.primaryType))}</p>
        </div>
        <div class="badge-list">
          <span class="pill">${escapeHtml(formatMinutes(day.estimatedTimeMin))}</span>
          ${day.usedFallback ? `<span class="pill warn">含兜底视频</span>` : ""}
          ${day.isManual ? `<span class="pill ok">手动已锁定</span>` : ""}
        </div>
      </div>

      ${day.note ? `<div class="info-box">${escapeHtml(day.note)}</div>` : ""}

      ${day.standardIds.length ? `
        <div class="video-group">
          <div class="group-title">基础矫正块</div>
          ${renderVideoItems(day.standardIds)}
        </div>
      ` : ""}

      ${day.focusIds.length ? `
        <div class="video-group">
          <div class="group-title">${escapeHtml(day.isManual && !day.standardIds.length ? "手动视频" : "主训练块")}</div>
          ${renderVideoItems(day.focusIds)}
        </div>
      ` : ""}

      ${day.extraIds.length ? `
        <div class="video-group">
          <div class="group-title">追加视频</div>
          ${renderVideoItems(day.extraIds)}
        </div>
      ` : ""}

      ${single ? "" : `
        <div class="day-actions">
          <button type="button" data-action="${day.completedAt ? "mark-day-undone" : "mark-day-done"}" data-day="${day.day}">
            ${day.completedAt ? "取消完成" : "完成这一天"}
          </button>
          <button type="button" class="secondary" data-action="set-current-day" data-day="${day.day}">设为今天</button>
          <button type="button" class="ghost" data-action="edit-plan-day" data-day="${day.day}" data-mode="replace">替换视频</button>
          <button type="button" class="ghost" data-action="edit-plan-day" data-day="${day.day}" data-mode="append">追加视频</button>
          ${day.isManual ? `<button type="button" class="danger" data-action="clear-day-override" data-day="${day.day}">清除手动搭配</button>` : ""}
        </div>
      `}
    </section>
  `;
}

function renderPlan(displayDays) {
  if (!displayDays.length) {
    els.planList.innerHTML = `<section class="card"><p class="empty">当前没有周期，点击“生成新周期”即可开始。</p></section>`;
  } else {
    els.planList.innerHTML = displayDays.map((day) => renderDayCard(day)).join("");
  }

  els.planWarnings.innerHTML = state.planWarnings.length
    ? `<div class="warning-box"><strong>视频池提示</strong><div class="stack" style="margin-top:8px;">${state.planWarnings.map((warning) => `<div>${escapeHtml(warning)}</div>`).join("")}</div></div>`
    : `<div class="success-box">当前激活视频池已满足基础排期下限，自动计划会优先使用导入视频。</div>`;

  renderPlanEditor();
}

function getFilteredLibraryVideos() {
  const search = state.libraryFilters.search.trim().toLowerCase();
  return state.videos.filter((video) => {
    if (state.libraryFilters.status !== "all" && video.status !== state.libraryFilters.status) return false;
    if (state.libraryFilters.category !== "all" && video.confirmedCategory !== state.libraryFilters.category) return false;
    if (!search) return true;
    const haystack = `${video.title} ${video.folder} ${video.videoId} ${video.canonicalUrl}`.toLowerCase();
    return haystack.includes(search);
  });
}

function renderImportSummary() {
  const latest = state.importBatches[0];
  els.importSummary.innerHTML = latest ? `
    <div class="info-box">
      <div class="summary-grid">
        <div><strong>${escapeHtml(latest.fileName)}</strong><div class="tiny">最近导入</div></div>
        <div><strong>${latest.parsedCount}</strong><div class="tiny">解析行数</div></div>
        <div><strong>${latest.addedCount}</strong><div class="tiny">新增</div></div>
        <div><strong>${latest.mergedCount}</strong><div class="tiny">合并</div></div>
        <div><strong>${latest.changedCount}</strong><div class="tiny">待复核</div></div>
      </div>
      <div class="tiny" style="margin-top:8px;">导入时间：${escapeHtml(formatDateTime(latest.importedAt))}</div>
    </div>
  ` : `<div class="empty">还没有导入记录。可以先导入 B 站收藏 CSV，视频会按 BV 长期累积到视频池。</div>`;
}

function renderPendingReview() {
  const pending = state.videos.filter((video) => video.status === "pending_review");
  if (!pending.length) {
    els.pendingReviewPanel.innerHTML = `<section class="card"><div class="success-box">当前没有待确认视频。后续导入只有新增或内容变更的视频才会进入这里。</div></section>`;
    return;
  }

  els.pendingReviewPanel.innerHTML = `
    <section class="card">
      <div class="card-head">
        <div>
          <h2>待确认视频</h2>
          <p class="subtle">同 BV 下标题或文件夹变化会重新进入复核；仅 URL 变化会沿用旧分类。</p>
        </div>
        <button type="button" data-action="confirm-all-pending">全部确认</button>
      </div>
      ${pending.map((video) => `
        <div class="review-item">
          <div class="review-row">
            <div>
              <div class="library-title">${escapeHtml(video.title)}</div>
              <div class="tiny">${escapeHtml(video.folder || "未分组")} · ${escapeHtml(video.videoId)}</div>
              <div class="tiny">${escapeHtml(video.reason || "")}</div>
            </div>
            <div class="badge-list">
              ${video.needsReview ? `<span class="pill warn">内容变更待复核</span>` : `<span class="pill">新增视频</span>`}
              ${video.confirmedCategory ? `<span class="pill">旧分类：${escapeHtml(CATEGORY_LABELS[video.confirmedCategory])}</span>` : ""}
            </div>
          </div>
          <div class="grid two" style="margin-top:12px;">
            <label class="field">
              <span>确认分类</span>
              <select data-action="change-review-category" data-video-id="${escapeHtml(video.videoId)}">
                ${CATEGORY_OPTIONS.map((option) => {
                  const value = state.reviewSelections[video.videoId] || video.confirmedCategory || video.suggestedCategory || "standard";
                  return `<option value="${option.id}" ${value === option.id ? "selected" : ""}>${escapeHtml(option.label)}</option>`;
                }).join("")}
              </select>
            </label>
            <div class="button-row" style="align-self:end;">
              <button type="button" class="secondary" data-action="open-video" data-video-id="${escapeHtml(video.videoId)}">打开视频</button>
              <button type="button" data-action="confirm-pending-video" data-video-id="${escapeHtml(video.videoId)}">确认这条</button>
            </div>
          </div>
        </div>
      `).join("")}
    </section>
  `;
}

function renderFreeMixer() {
  const selectedIds = state.freeMixer.selectedVideoIds;
  const totalMinutes = estimateVideoIds(selectedIds);
  els.freeMixerPanel.innerHTML = `
    <div class="stack">
      <div class="badge-list">
        <span class="pill">${selectedIds.length} 个视频</span>
        <span class="pill">${escapeHtml(formatMinutes(totalMinutes))}</span>
      </div>
      <div class="grid three">
        <label class="field">
          <span>保存到 Day</span>
          <select id="freeMixerDaySelect">
            ${Array.from({ length: 28 }, (_, index) => {
              const day = index + 1;
              return `<option value="${day}" ${Number(state.freeMixer.saveDay) === day ? "selected" : ""}>Day ${day}</option>`;
            }).join("")}
          </select>
        </label>
        <label class="field">
          <span>写回方式</span>
          <select id="freeMixerModeSelect">
            <option value="replace" ${state.freeMixer.saveMode === "replace" ? "selected" : ""}>覆盖这一天</option>
            <option value="append" ${state.freeMixer.saveMode === "append" ? "selected" : ""}>追加到这一天</option>
          </select>
        </label>
        <div class="button-row" style="align-self:end;">
          <button type="button" class="secondary" data-action="free-open-selected" ${selectedIds.length ? "" : "disabled"}>打开选中</button>
          <button type="button" data-action="free-complete-selected" ${selectedIds.length ? "" : "disabled"}>完成自由训练</button>
          <button type="button" class="ghost" data-action="free-save-to-day" ${selectedIds.length ? "" : "disabled"}>保存到计划日</button>
          <button type="button" class="danger" data-action="free-clear-selection" ${selectedIds.length ? "" : "disabled"}>清空</button>
        </div>
      </div>
      ${selectedIds.length ? renderVideoItems(selectedIds) : `<div class="empty">先在下面的视频池列表里勾选视频，组成一条自由训练。</div>`}
    </div>
  `;
}

function renderLibrary() {
  renderImportSummary();
  renderPendingReview();
  renderFreeMixer();

  const statusOptions = [
    { id: "all", label: "全部状态" },
    { id: "active", label: "激活中" },
    { id: "pending_review", label: "待确认" },
    { id: "archived", label: "已归档" }
  ];

  if (!els.libraryStatusFilter.options.length) {
    els.libraryStatusFilter.innerHTML = statusOptions.map((item) => `<option value="${item.id}">${escapeHtml(item.label)}</option>`).join("");
    els.libraryCategoryFilter.innerHTML = [{ id: "all", label: "全部分类" }, ...CATEGORY_OPTIONS]
      .map((item) => `<option value="${item.id}">${escapeHtml(item.label)}</option>`)
      .join("");
  }
  els.libraryStatusFilter.value = state.libraryFilters.status;
  els.libraryCategoryFilter.value = state.libraryFilters.category;
  els.librarySearchInput.value = state.libraryFilters.search;

  const items = getFilteredLibraryVideos();
  if (!items.length) {
    els.libraryList.innerHTML = `<section class="card"><p class="empty">当前筛选条件下没有视频。</p></section>`;
    return;
  }

  const referencedIds = getReferencedVideoIds();
  els.libraryList.innerHTML = items.map((video) => {
    const deletable = !referencedIds.has(video.videoId);
    const isSelected = state.freeMixer.selectedVideoIds.includes(video.videoId);
    const usage = getVideoUsageSeed(video);
    const displayCategory = video.confirmedCategory || video.suggestedCategory || "standard";
    return `
      <section class="library-card">
        <div class="library-row-head">
          <div>
            <div class="library-title">${escapeHtml(video.title)}</div>
            <div class="tiny">${escapeHtml(video.folder || "未分组")} · ${escapeHtml(video.videoId)}</div>
            <div class="tiny">${escapeHtml(video.reason || "")}</div>
          </div>
          <div class="badge-list">
            <span class="pill">${escapeHtml(getStatusLabel(video.status))}</span>
            <span class="pill">${escapeHtml(CATEGORY_LABELS[displayCategory])}</span>
            <span class="pill">${escapeHtml(formatMinutes(video.estimatedDurationMin))}</span>
          </div>
        </div>

        <div class="badge-list" style="margin-top:10px;">
          <span class="pill">计划使用 ${usage.planTimesUsed} 次</span>
          <span class="pill">自由训练 ${usage.freeTimesUsed} 次</span>
          ${video.needsReview ? `<span class="pill warn">待复核</span>` : ""}
        </div>

        <div class="library-actions">
          <button type="button" class="ghost" data-action="open-video" data-video-id="${escapeHtml(video.videoId)}">打开视频</button>
          ${video.status === "archived"
            ? `<button type="button" class="secondary" data-action="restore-video" data-video-id="${escapeHtml(video.videoId)}">恢复激活</button>`
            : `<button type="button" class="secondary" data-action="archive-video" data-video-id="${escapeHtml(video.videoId)}">归档</button>`}
          <button type="button" class="danger" data-action="delete-video" data-video-id="${escapeHtml(video.videoId)}" ${deletable ? "" : "disabled"}>
            ${deletable ? "硬删除" : "已被计划引用"}
          </button>
        </div>

        ${video.status === "active" ? `
          <label class="selection-row">
            <input type="checkbox" data-action="toggle-free-video" data-video-id="${escapeHtml(video.videoId)}" ${isSelected ? "checked" : ""} />
            <span>加入自由搭配器</span>
          </label>
        ` : ""}
      </section>
    `;
  }).join("");
}

function renderPlanEditor() {
  if (!state.planEditor) {
    els.planEditorPanel.innerHTML = "";
    return;
  }
  const activeVideos = state.videos.filter((video) => video.status === "active");
  const search = (state.planEditor.search || "").trim().toLowerCase();
  const filtered = activeVideos.filter((video) => {
    if (!search) return true;
    return `${video.title} ${video.folder} ${video.videoId}`.toLowerCase().includes(search);
  });
  els.planEditorPanel.innerHTML = `
    <section class="card editor-panel">
      <div class="card-head">
        <div>
          <div class="eyebrow">Plan Editor</div>
          <h3>Day ${state.planEditor.day} 手动搭配</h3>
          <p class="subtle">当前模式：${state.planEditor.mode === "replace" ? "覆盖这一天" : "追加到这一天"}。</p>
        </div>
        <div class="button-row">
          <button type="button" class="${state.planEditor.mode === "replace" ? "" : "secondary"}" data-action="editor-set-mode" data-mode="replace">覆盖</button>
          <button type="button" class="${state.planEditor.mode === "append" ? "" : "secondary"}" data-action="editor-set-mode" data-mode="append">追加</button>
          <button type="button" class="secondary" data-action="editor-save">保存</button>
          <button type="button" class="danger" data-action="editor-cancel">取消</button>
        </div>
      </div>
      <div class="grid two">
        <label class="field">
          <span>搜索视频</span>
          <input id="editorSearchInput" type="search" value="${escapeHtml(state.planEditor.search || "")}" placeholder="搜索激活视频" />
        </label>
        <div class="button-row" style="align-self:end;">
          <button type="button" class="ghost" data-action="editor-clear-selection">清空当前选择</button>
        </div>
      </div>
      <div class="editor-list" style="margin-top:12px;">
        ${filtered.length ? renderVideoItems(filtered.map((video) => video.videoId), "editor") : `<div class="empty">没有匹配的视频。</div>`}
      </div>
    </section>
  `;
}

async function getStorageSummary() {
  const localPhotoBytes = sumBy(state.photoAssets, (asset) => asset.sizeBytes);
  let browserUsage = 0;
  let browserQuota = 0;
  if (navigator.storage?.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      browserUsage = Number(estimate.usage || 0);
      browserQuota = Number(estimate.quota || 0);
    } catch (error) {
      browserUsage = 0;
      browserQuota = 0;
    }
  }
  return {
    localPhotoBytes,
    browserUsage,
    browserQuota
  };
}

function getPhotoAsset(photoId) {
  return state.photoAssets.find((asset) => asset.photoId === photoId) || null;
}

function getObjectUrl(photoId) {
  if (!photoId) return "";
  if (state.objectUrls.has(photoId)) return state.objectUrls.get(photoId);
  const asset = getPhotoAsset(photoId);
  if (!asset?.blob) return "";
  const url = URL.createObjectURL(asset.blob);
  state.objectUrls.set(photoId, url);
  return url;
}

function buildTrendSvg(pointsByMetric) {
  const width = 560;
  const height = 180;
  const padding = 18;
  const metricEntries = Object.entries(pointsByMetric).filter((entry) => entry[1].length > 1);
  if (!metricEntries.length) return `<div class="empty">至少保存两次快照后会显示趋势图。</div>`;

  const allValues = metricEntries.flatMap((entry) => entry[1].map((point) => point.value));
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const colors = {
    weight: "#f2647f",
    waist: "#ff9d4d",
    bodyFat: "#6b8cff"
  };

  const lines = metricEntries.map(([metric, points]) => {
    const d = points.map((point, index) => {
      const x = padding + ((width - padding * 2) / Math.max(points.length - 1, 1)) * index;
      const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
    return `<path d="${d}" fill="none" stroke="${colors[metric]}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />`;
  }).join("");

  return `
    <svg class="trend-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="快照趋势图">
      <rect x="0" y="0" width="${width}" height="${height}" rx="18" fill="#fff" stroke="#eadcdf" />
      ${lines}
    </svg>
    <div class="legend">
      <span><i class="dot" style="background:#f2647f;"></i>体重</span>
      <span><i class="dot" style="background:#ff9d4d;"></i>腰围</span>
      <span><i class="dot" style="background:#6b8cff;"></i>体脂率</span>
    </div>
  `;
}

function compareSnapshots(current, previous, profile, completionRate) {
  if (!current) return { summary: "", notes: [] };
  const deltas = previous ? {
    weight: Number(current.weightKg) - Number(previous.weightKg),
    bodyFat: Number(current.bodyFatPct) - Number(previous.bodyFatPct),
    bust: Number(current.bustCm) - Number(previous.bustCm),
    waist: Number(current.waistCm) - Number(previous.waistCm),
    hip: Number(current.hipCm) - Number(previous.hipCm),
    thigh: Number(current.thighCm) - Number(previous.thighCm),
    calf: Number(current.calfCm) - Number(previous.calfCm)
  } : null;
  const bmi = profile.heightCm ? Number(current.weightKg) / Math.pow(Number(profile.heightCm) / 100, 2) : null;
  const whr = Number(current.hipCm) ? Number(current.waistCm) / Number(current.hipCm) : null;
  const notes = [];
  if (deltas) {
    if (deltas.waist < 0) notes.push(`腰围较上一快照下降 ${Math.abs(deltas.waist).toFixed(1)} cm。`);
    if (deltas.bodyFat < 0) notes.push(`体脂率较上一快照下降 ${Math.abs(deltas.bodyFat).toFixed(1)}%。`);
    if (deltas.hip !== 0) notes.push(`臀围变化 ${deltas.hip > 0 ? "+" : ""}${deltas.hip.toFixed(1)} cm。`);
    if (deltas.thigh !== 0) notes.push(`大腿围变化 ${deltas.thigh > 0 ? "+" : ""}${deltas.thigh.toFixed(1)} cm。`);
    if (deltas.calf !== 0) notes.push(`小腿围变化 ${deltas.calf > 0 ? "+" : ""}${deltas.calf.toFixed(1)} cm。`);
  }
  if (completionRate < 50) notes.push("当前周期执行率还不高，优先保持每周稳定训练频率。");
  else if (completionRate >= 80) notes.push("当前周期执行率较高，可以继续沿用这套节奏。");
  return {
    summary: `${bmi ? `BMI ${bmi.toFixed(1)} · ` : ""}${whr ? `腰臀比 ${whr.toFixed(2)}` : ""}`.trim(),
    notes
  };
}

async function renderFeedback(displayDays) {
  const storage = await getStorageSummary();
  const usageWarning = storage.localPhotoBytes > 250 * 1024 * 1024
    ? "本地照片已超过 250MB，需先删除旧快照照片才能继续上传。"
    : storage.localPhotoBytes > 200 * 1024 * 1024
      ? "本地照片已超过 200MB，建议先清理旧照片。"
      : "当前照片体积仍在可接受范围内。";

  els.storageSummary.innerHTML = `
    <div class="${storage.localPhotoBytes > 200 * 1024 * 1024 ? "warning-box" : "info-box"}">
      <div class="summary-grid">
        <div><strong>${bytesToMB(storage.localPhotoBytes)}</strong><div class="tiny">照片资产</div></div>
        <div><strong>${storage.browserUsage ? bytesToMB(storage.browserUsage) : "-"}</strong><div class="tiny">浏览器已用</div></div>
        <div><strong>${storage.browserQuota ? bytesToMB(storage.browserQuota) : "-"}</strong><div class="tiny">浏览器配额</div></div>
      </div>
      <div class="tiny" style="margin-top:10px;">${escapeHtml(usageWarning)}</div>
    </div>
  `;

  if (els.profileForm.elements.heightCm) {
    els.profileForm.elements.heightCm.value = state.bodyProfile.heightCm || "";
  }
  if (els.snapshotForm.elements.date && !els.snapshotForm.elements.date.value) {
    els.snapshotForm.elements.date.value = getTodayIso();
  }

  const snapshotsAsc = state.bodySnapshots.slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const pointsByMetric = {
    weight: snapshotsAsc.map((item) => ({ label: item.label, value: Number(item.weightKg) })),
    waist: snapshotsAsc.map((item) => ({ label: item.label, value: Number(item.waistCm) })),
    bodyFat: snapshotsAsc.map((item) => ({ label: item.label, value: Number(item.bodyFatPct) }))
  };
  els.trendChart.innerHTML = buildTrendSvg(pointsByMetric);

  const latest = snapshotsAsc[snapshotsAsc.length - 1];
  const previous = snapshotsAsc[snapshotsAsc.length - 2] || null;
  const feedback = compareSnapshots(latest, previous, state.bodyProfile, computePlanStats(displayDays).completionRate);
  els.feedbackSummary.innerHTML = latest ? `
    <div class="info-box">
      <div><strong>${escapeHtml(latest.label)}</strong> · ${escapeHtml(formatDate(latest.date))}</div>
      <div class="tiny" style="margin-top:8px;">${escapeHtml(feedback.summary || "保存身高后会显示 BMI 与腰臀比。")}</div>
      <div class="stack" style="margin-top:10px;">
        ${(feedback.notes.length ? feedback.notes : ["继续积累快照，系统会显示客观变化与简短提示。"]).map((note) => `<div>${escapeHtml(note)}</div>`).join("")}
      </div>
    </div>
  ` : `<div class="empty">还没有身体快照。保存第一条快照后，这里会展示趋势和对比反馈。</div>`;

  if (!state.bodySnapshots.length) {
    els.snapshotList.innerHTML = `<section class="card"><p class="empty">暂无快照历史。</p></section>`;
    return;
  }

  els.snapshotList.innerHTML = state.bodySnapshots.map((snapshot) => {
    const photos = snapshot.photos || {};
    const metrics = [
      ["体重", `${snapshot.weightKg} kg`],
      ["体脂率", `${snapshot.bodyFatPct}%`],
      ["胸围", `${snapshot.bustCm} cm`],
      ["腰围", `${snapshot.waistCm} cm`],
      ["臀围", `${snapshot.hipCm} cm`],
      ["大腿围", `${snapshot.thighCm} cm`],
      ["小腿围", `${snapshot.calfCm} cm`]
    ];
    const photoAngles = [
      { key: "front", label: "正面" },
      { key: "side", label: "侧面" },
      { key: "back", label: "背面" }
    ];
    return `
      <section class="snapshot-card">
        <div class="snapshot-head">
          <div>
            <h3>${escapeHtml(snapshot.label)}</h3>
            <div class="tiny">${escapeHtml(formatDate(snapshot.date))}</div>
          </div>
          <button type="button" class="danger" data-action="delete-snapshot" data-snapshot-id="${escapeHtml(snapshot.snapshotId)}">删除快照</button>
        </div>
        <div class="snapshot-metrics">
          ${metrics.map(([label, value]) => `
            <div class="snapshot-metric">
              <div class="tiny">${escapeHtml(label)}</div>
              <div class="large-number small">${escapeHtml(value)}</div>
            </div>
          `).join("")}
        </div>
        <div class="photo-compare-grid" style="margin-top:14px;">
          ${photoAngles.map((angle) => `
            <div class="photo-slot">
              <strong>${escapeHtml(angle.label)}</strong>
              ${photos[angle.key]?.before ? `<img src="${getObjectUrl(photos[angle.key].before)}" alt="${escapeHtml(angle.label)}训练前" />` : `<div class="empty" style="margin-top:10px;">无训练前照片</div>`}
              ${photos[angle.key]?.after ? `<img src="${getObjectUrl(photos[angle.key].after)}" alt="${escapeHtml(angle.label)}训练后" />` : `<div class="empty" style="margin-top:10px;">无训练后照片</div>`}
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderAll() {
  const displayDays = getDisplayPlanDays();
  const stats = computePlanStats(displayDays);
  renderTopbar(stats);
  renderToday(displayDays, stats);
  renderPlan(displayDays);
  renderLibrary();
  renderFeedback(displayDays).catch((error) => {
    console.error(error);
    els.storageSummary.innerHTML = `<div class="warning-box">读取本地反馈数据时出现问题：${escapeHtml(error.message || String(error))}</div>`;
  });
  setActiveView(state.activeView);
}

function setActiveView(view) {
  state.activeView = view;
  localStorage.setItem(UI_KEYS.activeView, view);
  els.views.forEach((section) => section.classList.toggle("active", section.dataset.view === view));
  els.navButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
}

function setSettingsOpen(open) {
  els.settingsPanel.classList.toggle("hidden", !open);
  els.toggleSettingsBtn.textContent = open ? "收起设置" : "展开设置";
  localStorage.setItem(UI_KEYS.settingsOpen, open ? "1" : "0");
}

async function confirmPendingVideo(videoId) {
  const video = state.videos.find((item) => item.videoId === videoId);
  if (!video) return;
  const chosenCategory = state.reviewSelections[videoId] || video.confirmedCategory || video.suggestedCategory || "standard";
  const updated = {
    ...video,
    confirmedCategory: chosenCategory,
    status: "active",
    needsReview: false,
    updatedAt: new Date().toISOString()
  };
  await putRecord(STORES.videoLibrary, updated);
  delete state.reviewSelections[videoId];
  await refreshState();
  renderAll();
}

async function confirmAllPending() {
  const pending = state.videos.filter((video) => video.status === "pending_review");
  if (!pending.length) return;
  await putMany(
    STORES.videoLibrary,
    pending.map((video) => ({
      ...video,
      confirmedCategory: state.reviewSelections[video.videoId] || video.confirmedCategory || video.suggestedCategory || "standard",
      status: "active",
      needsReview: false,
      updatedAt: new Date().toISOString()
    }))
  );
  state.reviewSelections = {};
  await refreshState();
  renderAll();
  showToast("已确认全部待审核视频。");
}

async function importCsv(file) {
  const text = await file.text();
  const rows = parseCsv(text);
  if (!rows.length) {
    showToast("CSV 为空，未导入任何视频。");
    return;
  }
  const normalizedRows = rows.map((row) => ({
    title: String(row.title || "").trim(),
    url: String(row.url || "").trim(),
    folder: String(row.folder || "").trim(),
    created: String(row.created || "").trim()
  })).filter((row) => row.title && row.url && row.folder);

  if (!normalizedRows.length) {
    showToast("CSV 缺少必填字段 title / url / folder。");
    return;
  }

  const existingMap = new Map(state.videos.map((video) => [video.videoId, video]));
  const updates = [];
  const batchId = `batch_${Date.now()}`;
  const importedAt = new Date().toISOString();
  let addedCount = 0;
  let mergedCount = 0;
  let changedCount = 0;

  normalizedRows.forEach((row) => {
    const inferred = classifyVideo(row);
    const videoId = getVideoIdFromRecord(row);
    const bv = extractBV(row.url);
    const record = existingMap.get(videoId);
    const duration = parseEstimatedDuration(row.title) || defaultDurationByCategory(inferred.category);
    if (!record) {
      addedCount += 1;
      updates.push({
        videoId,
        canonicalUrl: normalizeUrl(row.url),
        rawUrl: row.url,
        title: row.title,
        folder: row.folder,
        created: row.created,
        estimatedDurationMin: duration,
        status: "pending_review",
        suggestedCategory: inferred.category,
        confirmedCategory: "",
        reason: inferred.reason,
        needsReview: false,
        sourceType: "imported",
        importBatchIds: [batchId],
        usage: { planTimesUsed: 0, planLastUsedAt: "", freeTimesUsed: 0, freeLastUsedAt: "" },
        createdAt: importedAt,
        updatedAt: importedAt
      });
      return;
    }

    mergedCount += 1;
    const titleChanged = record.title !== row.title;
    const folderChanged = record.folder !== row.folder;
    const urlChanged = record.rawUrl !== row.url || record.canonicalUrl !== normalizeUrl(row.url);
    const createdChanged = String(record.created || "") !== String(row.created || "");
    let status = record.status;
    let needsReview = record.needsReview;
    let suggestedCategory = record.suggestedCategory || inferred.category;
    let reason = record.reason || inferred.reason;
    let confirmedCategory = record.confirmedCategory;

    if (titleChanged || folderChanged) {
      changedCount += 1;
      status = "pending_review";
      needsReview = true;
      suggestedCategory = inferred.category;
      reason = `${inferred.reason}；检测到标题或文件夹变化，需要重新确认。`;
    } else if (urlChanged) {
      reason = `${record.reason || inferred.reason}；仅 URL 更新，沿用既有分类。`;
    } else if (createdChanged) {
      reason = record.reason || inferred.reason;
    }

    updates.push({
      ...record,
      canonicalUrl: bv ? `https://www.bilibili.com/video/${bv}` : normalizeUrl(row.url),
      rawUrl: row.url,
      title: row.title,
      folder: row.folder,
      created: row.created,
      estimatedDurationMin: duration || record.estimatedDurationMin,
      status,
      needsReview,
      suggestedCategory,
      confirmedCategory,
      reason,
      importBatchIds: unique([...(record.importBatchIds || []), batchId]),
      updatedAt: importedAt
    });
  });

  const batch = {
    batchId,
    fileName: file.name,
    importedAt,
    parsedCount: rows.length,
    addedCount,
    mergedCount,
    changedCount
  };
  await putMany(STORES.videoLibrary, updates);
  await putRecord(STORES.importBatches, batch);
  await refreshState();
  renderAll();
  showToast(`导入完成：新增 ${addedCount}，合并 ${mergedCount}，待复核 ${changedCount}。`);
}

function openVideo(videoId) {
  const video = getVideoById(videoId);
  if (video?.rawUrl) window.open(video.rawUrl, "_blank", "noopener");
}

async function updateVideoStatus(videoId, status) {
  const video = state.videos.find((item) => item.videoId === videoId);
  if (!video) return;
  const updated = {
    ...video,
    status,
    updatedAt: new Date().toISOString()
  };
  await putRecord(STORES.videoLibrary, updated);
  await refreshState();
  renderAll();
}

async function hardDeleteVideo(videoId) {
  const referenced = getReferencedVideoIds();
  if (referenced.has(videoId)) {
    showToast("该视频已被当前或历史计划引用，只能归档。");
    return;
  }
  await deleteRecord(STORES.videoLibrary, videoId);
  delete state.reviewSelections[videoId];
  state.freeMixer.selectedVideoIds = state.freeMixer.selectedVideoIds.filter((id) => id !== videoId);
  await refreshState();
  renderAll();
  showToast("已硬删除该视频。");
}

function getDisplayDay(dayNumber) {
  return getDisplayPlanDays().find((day) => day.day === Number(dayNumber));
}

async function recalculateUsageAndPersist() {
  const usageMap = new Map(state.videos.map((video) => [video.videoId, { planTimesUsed: 0, planLastUsedAt: "", freeTimesUsed: 0, freeLastUsedAt: "" }]));

  state.sessions.forEach((session) => {
    (session.videoIds || []).forEach((videoId) => {
      if (!usageMap.has(videoId)) return;
      const usage = usageMap.get(videoId);
      if (session.source === "plan") {
        usage.planTimesUsed += 1;
        if (!usage.planLastUsedAt || usage.planLastUsedAt < session.completedAt) usage.planLastUsedAt = session.completedAt;
      }
      if (session.source === "free") {
        usage.freeTimesUsed += 1;
        if (!usage.freeLastUsedAt || usage.freeLastUsedAt < session.completedAt) usage.freeLastUsedAt = session.completedAt;
      }
    });
  });

  await putMany(
    STORES.videoLibrary,
    state.videos.map((video) => ({
      ...video,
      usage: usageMap.get(video.videoId) || { planTimesUsed: 0, planLastUsedAt: "", freeTimesUsed: 0, freeLastUsedAt: "" },
      updatedAt: new Date().toISOString()
    }))
  );
}

async function markDay(dayNumber, done) {
  if (!state.currentCycle) return;
  const dayRecord = state.planDays.find((item) => item.cycleId === state.currentCycle.cycleId && item.day === Number(dayNumber));
  if (!dayRecord) return;
  const displayDay = getDisplayDay(dayNumber);
  const sessionId = `plan:${state.currentCycle.cycleId}:${dayNumber}`;
  if (done) {
    const updatedDay = { ...dayRecord, completedAt: new Date().toISOString() };
    await putRecord(STORES.planDays, updatedDay);
    await putRecord(STORES.sessionHistory, {
      sessionId,
      source: "plan",
      cycleId: state.currentCycle.cycleId,
      day: Number(dayNumber),
      videoIds: displayDay?.allIds || getAllDayVideoIds(dayRecord),
      completedAt: updatedDay.completedAt,
      totalMinutes: displayDay?.estimatedTimeMin || dayRecord.estimatedTimeMin
    });
  } else {
    const updatedDay = { ...dayRecord, completedAt: "" };
    await putRecord(STORES.planDays, updatedDay);
    await deleteRecord(STORES.sessionHistory, sessionId);
  }
  await refreshState();
  await recalculateUsageAndPersist();
  await refreshState();
  renderAll();
}

function startPlanEditor(day, mode) {
  const dayRecord = state.currentCycle
    ? state.planDays.find((item) => item.cycleId === state.currentCycle.cycleId && item.day === Number(day))
    : null;
  state.planEditor = {
    day: Number(day),
    mode,
    search: "",
    selectedVideoIds: dayRecord?.manualOverride?.videoIds ? dayRecord.manualOverride.videoIds.slice() : []
  };
  renderPlanEditor();
}

async function savePlanEditor() {
  if (!state.currentCycle || !state.planEditor) return;
  const dayRecord = state.planDays.find((item) => item.cycleId === state.currentCycle.cycleId && item.day === state.planEditor.day);
  if (!dayRecord) return;
  if (!state.planEditor.selectedVideoIds.length) {
    showToast("请先选择至少一个视频。");
    return;
  }
  const updated = {
    ...dayRecord,
    manualOverride: {
      mode: state.planEditor.mode,
      videoIds: unique(state.planEditor.selectedVideoIds),
      savedAt: new Date().toISOString(),
      source: "plan-editor"
    },
    locked: true
  };
  await putRecord(STORES.planDays, updated);
  state.planEditor = null;
  await refreshState();
  renderAll();
  showToast("已保存该天的手动搭配。");
}

async function clearDayOverride(dayNumber) {
  if (!state.currentCycle) return;
  const dayRecord = state.planDays.find((item) => item.cycleId === state.currentCycle.cycleId && item.day === Number(dayNumber));
  if (!dayRecord) return;
  const updated = {
    ...dayRecord,
    manualOverride: null,
    locked: false
  };
  await putRecord(STORES.planDays, updated);
  await refreshState();
  renderAll();
  showToast("已清除该天的手动搭配。");
}

async function completeFreeSession() {
  if (!state.freeMixer.selectedVideoIds.length) return;
  const completedAt = new Date().toISOString();
  await putRecord(STORES.sessionHistory, {
    sessionId: `free:${Date.now()}`,
    source: "free",
    videoIds: unique(state.freeMixer.selectedVideoIds),
    completedAt,
    totalMinutes: estimateVideoIds(state.freeMixer.selectedVideoIds)
  });
  state.freeMixer.selectedVideoIds = [];
  await refreshState();
  await recalculateUsageAndPersist();
  await refreshState();
  renderAll();
  showToast("已记录一条自由训练。");
}

async function saveFreeToDay() {
  if (!state.currentCycle || !state.freeMixer.selectedVideoIds.length) {
    showToast("先选择自由搭配视频。");
    return;
  }
  const day = clamp(Number(state.freeMixer.saveDay || 1), 1, 28);
  const dayRecord = state.planDays.find((item) => item.cycleId === state.currentCycle.cycleId && item.day === day);
  if (!dayRecord) return;
  const updated = {
    ...dayRecord,
    manualOverride: {
      mode: state.freeMixer.saveMode,
      videoIds: unique(state.freeMixer.selectedVideoIds),
      savedAt: new Date().toISOString(),
      source: "free-mixer"
    },
    locked: true
  };
  await putRecord(STORES.planDays, updated);
  await refreshState();
  renderAll();
  showToast(`自由搭配已保存到 Day ${day}。`);
}

async function saveBodyProfile(form) {
  const heightCm = Number(form.heightCm.value || 0);
  if (!heightCm) {
    showToast("请输入身高。");
    return;
  }
  await putRecord(STORES.bodyProfiles, { id: "primary", heightCm });
  await refreshState();
  renderAll();
  showToast("身高已保存。");
}

async function compressImage(file) {
  let width = 0;
  let height = 0;
  let draw;

  if ("createImageBitmap" in window) {
    const bitmap = await createImageBitmap(file);
    width = bitmap.width;
    height = bitmap.height;
    draw = (context, nextWidth, nextHeight) => {
      context.drawImage(bitmap, 0, 0, nextWidth, nextHeight);
      if (typeof bitmap.close === "function") bitmap.close();
    };
  } else {
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error("读取图片失败"));
      reader.readAsDataURL(file);
    });
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("加载图片失败"));
      img.src = dataUrl;
    });
    width = image.width;
    height = image.height;
    draw = (context, nextWidth, nextHeight) => {
      context.drawImage(image, 0, 0, nextWidth, nextHeight);
    };
  }

  const scale = Math.min(1, 1600 / Math.max(width, height));
  const nextWidth = Math.max(1, Math.round(width * scale));
  const nextHeight = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = nextWidth;
  canvas.height = nextHeight;
  const context = canvas.getContext("2d");
  draw(context, nextWidth, nextHeight);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
  if (!blob) throw new Error("图片压缩失败");
  return { blob, width: nextWidth, height: nextHeight };
}

async function saveSnapshot(form) {
  const formData = new FormData(form);
  const snapshotId = `snapshot_${Date.now()}`;
  const snapshot = {
    snapshotId,
    label: String(formData.get("label") || "").trim(),
    date: String(formData.get("date") || "").trim(),
    weightKg: Number(formData.get("weightKg") || 0),
    bodyFatPct: Number(formData.get("bodyFatPct") || 0),
    bustCm: Number(formData.get("bustCm") || 0),
    waistCm: Number(formData.get("waistCm") || 0),
    hipCm: Number(formData.get("hipCm") || 0),
    thighCm: Number(formData.get("thighCm") || 0),
    calfCm: Number(formData.get("calfCm") || 0),
    photos: {}
  };

  const photoDescriptors = [
    ["front", "before"],
    ["front", "after"],
    ["side", "before"],
    ["side", "after"],
    ["back", "before"],
    ["back", "after"]
  ];

  const pendingAssets = [];
  for (const [angle, phase] of photoDescriptors) {
    const fieldName = `${angle}_${phase}`;
    const file = formData.get(fieldName);
    if (!(file instanceof File) || !file.size) continue;
    const compressed = await compressImage(file);
    pendingAssets.push({
      angle,
      phase,
      photoId: `photo_${Date.now()}_${angle}_${phase}_${Math.random().toString(36).slice(2, 7)}`,
      blob: compressed.blob,
      width: compressed.width,
      height: compressed.height,
      mimeType: compressed.blob.type || "image/jpeg",
      sizeBytes: compressed.blob.size
    });
  }

  const storage = await getStorageSummary();
  const projectedBytes = storage.localPhotoBytes + sumBy(pendingAssets, (asset) => asset.sizeBytes);
  if (projectedBytes > 250 * 1024 * 1024) {
    showToast("照片体积将超过 250MB，请先删除旧快照后再上传。");
    return;
  }
  if (projectedBytes > 200 * 1024 * 1024) {
    showToast("提醒：照片体积已超过 200MB，建议后续清理旧照片。");
  }

  const photoRecords = pendingAssets.map((asset) => {
    if (!snapshot.photos[asset.angle]) snapshot.photos[asset.angle] = {};
    snapshot.photos[asset.angle][asset.phase] = asset.photoId;
    return {
      photoId: asset.photoId,
      snapshotId,
      angle: asset.angle,
      phase: asset.phase,
      blob: asset.blob,
      mimeType: asset.mimeType,
      sizeBytes: asset.sizeBytes,
      width: asset.width,
      height: asset.height,
      createdAt: new Date().toISOString()
    };
  });

  await putRecord(STORES.bodySnapshots, snapshot);
  await putMany(STORES.photoAssets, photoRecords);
  form.reset();
  form.elements.date.value = getTodayIso();
  await refreshState();
  renderAll();
  showToast("身体快照已保存。");
}

async function deleteSnapshot(snapshotId) {
  const snapshot = state.bodySnapshots.find((item) => item.snapshotId === snapshotId);
  if (!snapshot) return;
  const photoIds = [];
  Object.values(snapshot.photos || {}).forEach((pair) => {
    if (pair?.before) photoIds.push(pair.before);
    if (pair?.after) photoIds.push(pair.after);
  });
  await deleteRecord(STORES.bodySnapshots, snapshotId);
  for (const photoId of photoIds) {
    await deleteRecord(STORES.photoAssets, photoId);
    const url = state.objectUrls.get(photoId);
    if (url) URL.revokeObjectURL(url);
    state.objectUrls.delete(photoId);
  }
  await refreshState();
  renderAll();
  showToast("已删除该快照与关联照片。");
}

function downloadJson() {
  const payload = {
    videoLibrary: state.videos,
    planCycle: state.currentCycle,
    planDays: state.currentCycle ? getCyclePlanDays(state.currentCycle.cycleId) : [],
    sessionHistory: state.sessions,
    bodyProfile: state.bodyProfile,
    bodySnapshots: state.bodySnapshots
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `training-pool-export-${getTodayIso()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function saveReminder() {
  const time = els.notifyTimeInput.value;
  state.notifyTime = time;
  localStorage.setItem(UI_KEYS.notifyTime, time);
  if (!("Notification" in window)) {
    showToast("当前浏览器不支持网页通知，提醒时间已保存在本地。");
    return;
  }
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") showToast("提醒已保存，浏览器通知权限已开启。");
    else showToast("提醒已保存，但浏览器通知权限未开启。");
  }).catch(() => {
    showToast("提醒已保存。");
  });
}

function startReminderLoop() {
  window.setInterval(() => {
    if (!state.notifyTime) return;
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const key = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${hh}:${mm}`;
    if (`${hh}:${mm}` === state.notifyTime && state.lastNotifyKey !== key) {
      state.lastNotifyKey = key;
      try {
        new Notification("今日训练提醒", {
          body: `打开今天的训练卡片开始跟练（Day ${getCurrentDayNumber()}）`
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, 1000);
}

function registerInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredPrompt = event;
    els.installBtn.hidden = false;
  });
  window.addEventListener("appinstalled", () => {
    state.deferredPrompt = null;
    els.installBtn.hidden = true;
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").catch((error) => {
    console.error("Service Worker 注册失败", error);
  });
}

async function handleAction(action, target) {
  switch (action) {
    case "switch-view":
      setActiveView(target.dataset.view);
      break;
    case "open-import":
      els.csvInput.click();
      break;
    case "generate-cycle":
      await createNewCycle();
      renderAll();
      break;
    case "open-video":
      openVideo(target.dataset.videoId);
      break;
    case "confirm-pending-video":
      await confirmPendingVideo(target.dataset.videoId);
      break;
    case "confirm-all-pending":
      await confirmAllPending();
      break;
    case "archive-video":
      await updateVideoStatus(target.dataset.videoId, "archived");
      showToast("已归档该视频。");
      break;
    case "restore-video":
      await updateVideoStatus(target.dataset.videoId, "active");
      showToast("已恢复激活。");
      break;
    case "delete-video":
      await hardDeleteVideo(target.dataset.videoId);
      break;
    case "mark-day-done":
      await markDay(target.dataset.day, true);
      break;
    case "mark-day-undone":
      await markDay(target.dataset.day, false);
      break;
    case "set-current-day":
      state.currentDayOverride = Number(target.dataset.day);
      localStorage.setItem(UI_KEYS.currentDay, String(state.currentDayOverride));
      renderAll();
      setActiveView("today");
      break;
    case "edit-plan-day":
      startPlanEditor(target.dataset.day, target.dataset.mode);
      setActiveView("plan");
      break;
    case "editor-save":
      await savePlanEditor();
      break;
    case "editor-cancel":
      state.planEditor = null;
      renderAll();
      break;
    case "editor-set-mode":
      if (state.planEditor) {
        state.planEditor.mode = target.dataset.mode;
        renderPlanEditor();
      }
      break;
    case "editor-clear-selection":
      if (state.planEditor) {
        state.planEditor.selectedVideoIds = [];
        renderPlanEditor();
      }
      break;
    case "clear-day-override":
      await clearDayOverride(target.dataset.day);
      break;
    case "toggle-free-video":
      toggleFreeVideo(target.dataset.videoId, target.checked);
      break;
    case "toggle-editor-video":
      toggleEditorVideo(target.dataset.videoId, target.checked);
      break;
    case "free-open-selected":
      state.freeMixer.selectedVideoIds.forEach((videoId) => openVideo(videoId));
      break;
    case "free-complete-selected":
      await completeFreeSession();
      break;
    case "free-save-to-day":
      await saveFreeToDay();
      break;
    case "free-clear-selection":
      state.freeMixer.selectedVideoIds = [];
      renderLibrary();
      break;
    case "export-json":
      downloadJson();
      break;
    case "delete-snapshot":
      await deleteSnapshot(target.dataset.snapshotId);
      break;
    default:
      break;
  }
}

function toggleFreeVideo(videoId, checked) {
  const next = new Set(state.freeMixer.selectedVideoIds);
  if (checked) next.add(videoId);
  else next.delete(videoId);
  state.freeMixer.selectedVideoIds = Array.from(next);
  renderLibrary();
}

function toggleEditorVideo(videoId, checked) {
  if (!state.planEditor) return;
  const next = new Set(state.planEditor.selectedVideoIds);
  if (checked) next.add(videoId);
  else next.delete(videoId);
  state.planEditor.selectedVideoIds = Array.from(next);
  renderPlanEditor();
}

function attachEvents() {
  document.body.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    handleAction(target.dataset.action, target).catch((error) => {
      console.error(error);
      showToast(error.message || "执行操作时出错。");
    });
  });

  document.body.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches('[data-action="change-review-category"]')) {
      state.reviewSelections[target.dataset.videoId] = target.value;
      return;
    }
    if (target.id === "freeMixerDaySelect") {
      state.freeMixer.saveDay = Number(target.value);
      return;
    }
    if (target.id === "freeMixerModeSelect") {
      state.freeMixer.saveMode = target.value;
      return;
    }
  });

  document.body.addEventListener("input", (event) => {
    const target = event.target;
    if (target.id === "librarySearchInput") {
      state.libraryFilters.search = target.value;
      renderLibrary();
      return;
    }
    if (target.id === "editorSearchInput" && state.planEditor) {
      state.planEditor.search = target.value;
      renderPlanEditor();
      return;
    }
  });

  els.libraryStatusFilter.addEventListener("change", () => {
    state.libraryFilters.status = els.libraryStatusFilter.value;
    renderLibrary();
  });
  els.libraryCategoryFilter.addEventListener("change", () => {
    state.libraryFilters.category = els.libraryCategoryFilter.value;
    renderLibrary();
  });

  els.csvInput.addEventListener("change", async () => {
    const file = els.csvInput.files?.[0];
    if (!file) return;
    try {
      await importCsv(file);
    } finally {
      els.csvInput.value = "";
    }
  });

  els.toggleSettingsBtn.addEventListener("click", () => {
    const open = els.settingsPanel.classList.contains("hidden");
    setSettingsOpen(open);
  });

  els.periodModeInput.addEventListener("change", () => {
    state.periodMode = els.periodModeInput.checked;
    localStorage.setItem(UI_KEYS.periodMode, state.periodMode ? "1" : "0");
    renderAll();
  });
  els.periodStartInput.addEventListener("change", () => {
    state.periodStart = clamp(Number(els.periodStartInput.value || 1), 1, 28);
    els.periodStartInput.value = String(state.periodStart);
    localStorage.setItem(UI_KEYS.periodStart, String(state.periodStart));
    renderAll();
  });
  els.saveReminderBtn.addEventListener("click", saveReminder);

  els.profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveBodyProfile(event.currentTarget).catch((error) => {
      console.error(error);
      showToast(error.message || "保存身高失败。");
    });
  });

  els.snapshotForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSnapshot(event.currentTarget).catch((error) => {
      console.error(error);
      showToast(error.message || "保存快照失败。");
    });
  });

  els.installBtn.addEventListener("click", async () => {
    if (!state.deferredPrompt) return;
    state.deferredPrompt.prompt();
    try {
      await state.deferredPrompt.userChoice;
    } catch (error) {
      console.error(error);
    }
    state.deferredPrompt = null;
    els.installBtn.hidden = true;
  });
}

function runSmokeTests() {
  console.assert(BASE_PRIMARY_TYPES.length === 28, "基础计划长度必须是 28");
  console.assert(PERIOD_SEQUENCE.length === 7, "生理期替换必须是 7 天");
  console.assert(getVideoIdFromRecord({ url: "https://www.bilibili.com/video/BV123abc4567?p=1" }).startsWith("bv:"), "BV 提取失败");
  console.assert(classifyVideo({ title: "30分钟Barre芭杆臀腿雕刻", folder: "塑形" }).category === "sculpt", "分类规则失败");
  console.assert(typeof parseCsv("title,url,folder\nA,https://a.com,x").length === "number", "CSV 解析失败");
}

async function init() {
  state.db = await openDatabase();
  await refreshState();
  if (!state.currentCycle) {
    await createNewCycle();
  }
  renderAll();
  setSettingsOpen(localStorage.getItem(UI_KEYS.settingsOpen) === "1");
  attachEvents();
  registerInstallPrompt();
  registerServiceWorker();
  startReminderLoop();
  runSmokeTests();
}

window.addEventListener("beforeunload", () => {
  state.objectUrls.forEach((url) => URL.revokeObjectURL(url));
  state.objectUrls.clear();
});

init().catch((error) => {
  console.error(error);
  showToast(error.message || "初始化失败。");
});
