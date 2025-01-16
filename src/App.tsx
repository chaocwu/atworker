import { read, utils, WorkSheet } from "xlsx";
import * as React from "react";
import Mustache from "mustache";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { getKeyFromTestDesc, mappingSeverity } from "./lib/utils";
import { Step, Test } from "./types/test";
import { Clipboard, ClipboardCheck } from "lucide-react";
import template from "@/assets/template.mustache?raw";
import { ArrowRightLeft } from "lucide-react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { KeywordsDesc } from "./components/template-desc";

const parseSheetToTests = (sheet: WorkSheet, sheetName: string): Test[] => {
  const sheetData = utils.sheet_to_json<Record<string, unknown>>(sheet);
  return sheetData.map((sheetTest) => {
    const test: { [key: string]: string | Step[] } = {
      suite: sheetName.toLowerCase(),
    };

    Object.entries(sheetTest).forEach(([key, value]) => {
      const keyName = getKeyFromTestDesc(key);
      if (keyName) {
        test[keyName] = typeof value === "string" ? value : String(value);
      } else {
        test[key] = typeof value === "string" ? value : String(value);
      }
    });

    if (test.steps && test.expects) {
      const steps = (test.steps as string)
        .split("\n")
        .filter((step) => step.trim() !== "");
      const expects = (test.expects as string)
        .split("\n")
        .filter((expect) => expect.trim() !== "");

      test.steps = steps.map((step, index) => ({
        step,
        expect: expects[index] || "",
      }));
      Reflect.deleteProperty(test, "expects");
      test.code = (test.code as string)?.toLowerCase() || "";
    }

    if (test.severity) {
      test.severity = mappingSeverity(test.severity as string).toUpperCase();
    }

    return test as Test;
  });
};

function App() {
  const [data, setData] = React.useState<Test[]>([]);
  const [selectedRow, setSelectedRow] = React.useState<Test | null>(null);
  const [icon, setIcon] = React.useState<React.ReactNode>(<Clipboard className="h-4 w-4" />);

  const handleRowSelect = (row: Test | null) => {
    setSelectedRow(row);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      selectedRow ? Mustache.render(template, selectedRow) : ""
    )
    setIcon(<ClipboardCheck className="h-4 w-4" />);

    setTimeout(() => {
      setIcon(<Clipboard className="h-4 w-4" />);
    }, 2000);
  };

  const handleTestUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      const filePromises = Array.from(files).map((file) => {
        return new Promise<Test[]>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (!event.target?.result) return resolve([]);
            const workbook = read(event.target.result, { type: "binary" });
            const tests = workbook.SheetNames.flatMap((sheetName) =>
              parseSheetToTests(workbook.Sheets[sheetName], sheetName)
            );
            resolve(tests);
          };
          reader.onerror = () => resolve([]);
          reader.readAsArrayBuffer(file);
        });
      });

      const allTests = await Promise.all(filePromises);
      setData(allTests.flat());
    } catch (error) {
      console.error("文件读取失败:", error);
      setData([]);
    }
  };

  return (
    <div className="container mx-auto h-screen w-full flex items-center overflow-hidden p-8 gap-6">
      <div className="h-full max-w-xl flex flex-col p-8 gap-4 border border-base-300 rounded-box shadow-xs">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            <h1 className="text-xl font-bold">Excel 2 Allure Template</h1>
          </div>
          <p className="text-xs opacity-50">
            按既定文本用例格式生成测试脚本 Allure 模板
          </p>
        </div>
        <div className="grid grid-cols-[70%_1fr] gap-4">
          <input
            type="file"
            className="file-input file-input-primary w-full"
            accept=".xlsx,.xls"
            onChange={handleTestUpload}
          />
          <a
            href="/用例模板.xlsx"
            download="用例模板.xlsx"
            className="btn btn-dash btn-secondary"
          >
            示例模板
          </a>
        </div>
        {data.length > 0 ? (
          <DataTable
            columns={columns}
            data={data}
            onRowSelect={handleRowSelect}
          />
        ) : (
          <KeywordsDesc />
        )}
      </div>
      <div className="relative h-full flex flex-col flex-1 w-full border border-base-300 rounded-box shadow-xs">
        <button
          className="btn btn-sm btn-square absolute top-8 right-8"
          onClick={handleCopy}
        >
          {icon}
        </button>
        {data.length > 0 && template && selectedRow ? (
          <SyntaxHighlighter
            language="python"
            style={darcula}
            customStyle={{
              borderRadius: "8px",
              height: "100%",
              width: "100%",
              fontSize: "12px",
            }}
            showLineNumbers
          >
            {Mustache.render(template, selectedRow)}
          </SyntaxHighlighter>
        ) : null}
      </div>
    </div>
  );
}

export default App;
