import { CircleAlert } from "lucide-react";

const Keywords = {
  用例编号: ["用例编号", "编号", "编码", "序号", "code"],
  用例标题: [
    "用例标题",
    "用例名称",
    "测试名称",
    "标题",
    "用例",
    "名称",
    "title",
  ],
  测试步骤: ["测试步骤", "步骤", "steps"],
  期望结果: ["期望结果", "期望", "预期结果", "预期", "expects"],
  用例等级: ["用例等级", "优先级", "级别", "等级", "severity"],
  测试人员: ["测试人员", "负责人", "测试", "执行", "作者", "owner"],
};

export function KeywordsDesc() {
  return (
    <div className="h-full flex flex-col pt-6 gap-2">
      <p className="text-sm flex items-center gap-2">
        <CircleAlert className="h-4 w-4" />
        文本用例应该包含的字段映射
      </p>
      <ul className="flex flex-col gap-1 text-sm">
        {Object.entries(Keywords).map(([key, value]) => (
          <li key={key}>
            <span className="opacity-60">{value.join(", ")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
