const TestDesc = {
  code: ["用例编号", "编号", "编码", "序号", "code"],
  title: ["用例标题", "用例名称", "测试名称", "标题", "用例", "名称", "title"],
  steps: ["测试步骤", "步骤", "steps"],
  expects: ["期望结果", "期望", "预期结果", "预期", "expects"],
  severity: ["用例等级", "优先级", "级别", "等级", "severity"],
  owner: ["测试人员", "负责人", "测试", "执行", "作者", "owner"],
};

export function getKeyFromTestDesc(key: string): string | undefined {
  for (const [descKey, descValues] of Object.entries(TestDesc)) {
    if (descValues.includes(key)) {
      return descKey;
    }
  }
  return undefined;
}

export function mappingSeverity(severity: string) {
  switch (severity.toLowerCase()) {
    case "p0":
    case "l0":
    case "level0":
    case "致命":
    case "阻塞":
    case "冒烟":
      return "blocker";
    case "p1":
    case "l1":
    case "level1":
    case "高":
    case "严重":
      return "critical";
    case "p2":
    case "l2":
    case "level2":
    case "中":
    case "一般":
      return "normal";
    case "p3":
    case "l3":
    case "level3":
    case "低":
      return "minor";
    default:
      return severity;
  }
}
