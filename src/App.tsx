import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRightLeft,
} from "lucide-react";

function App() {
  return (
    <div className="h-screen grid grid-cols-[30%_1fr] p-8 gap-8 overflow-hidden">
      <div className="flex flex-col p-8 gap-4 border border-base-300 rounded-box">
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
          <input type="file" className="file-input file-input-primary w-full" />
          <button className="btn btn-secondary btn-dash">示例模板</button>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <label className="input w-full">
            <Search className="h-4 w-4" />
            <input type="search" />
          </label>
          <div className="overflow-x-auto border border-base-300 rounded-box min-h-[100vh] flex-1 md:min-h-min">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>编号</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cy Ganderton</td>
                </tr>
                <tr>
                  <td>Hart Hagerty</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center gap-4">
            <button className="btn btn-soft btn-neutral btn-square">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="btn btn-soft btn-neutral btn-square">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="mockup-code flex flex-col border border-base-300 rounded-box bg-base-100">
        <pre>
          <code>npm i daisyui</code>
        </pre>
      </div>
    </div>
  );
}

export default App;
