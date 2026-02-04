
import { GradeResult, TestCase } from '../types';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

class PythonService {
  private pyodide: any = null;

  async init() {
    if (this.pyodide) return;
    try {
      this.pyodide = await window.loadPyodide();
    } catch (e) {
      console.error("Pyodide failed to load", e);
    }
  }

  async runCode(code: string, input: string = ''): Promise<{ output: string; error?: string }> {
    if (!this.pyodide) await this.init();

    try {
      // Correcting the script to not use 'return' at the top level
      const script = `
import sys
import io

input_data = ${JSON.stringify(input)}
input_stream = io.StringIO(input_data)

def mock_input(prompt=''):
    line = input_stream.readline()
    if not line:
        return ""
    return line.rstrip('\\r\\n')

sys.stdin = input_stream
__builtins__.input = mock_input
sys.stdout = io.StringIO()
      
try:
    exec(${JSON.stringify(code)}, {})
    final_output = sys.stdout.getvalue().strip()
except Exception as e:
    # Capture output before error and the error message itself
    final_output = (sys.stdout.getvalue() + "\\n" + str(e)).strip()

final_output
      `;
      const result = await this.pyodide.runPythonAsync(script);
      return { output: String(result).trim() };
    } catch (err: any) {
      return { output: '', error: err.message };
    }
  }

  async grade(code: string, testCases: TestCase[]): Promise<GradeResult> {
    const results = [];
    let overallPassed = true;

    for (const testCase of testCases) {
      const { output, error } = await this.runCode(code, testCase.input);
      
      // Strict matching but ignoring surrounding whitespace/newlines
      const actual = output.trim();
      const expected = testCase.expectedOutput.trim();
      
      const passed = actual === expected;
      
      if (!passed) overallPassed = false;
      
      results.push({
        passed,
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: output || error || ''
      });
    }

    return {
      passed: overallPassed,
      actualOutput: results[0]?.actual || '',
      testResults: results
    };
  }
}

export const pythonService = new PythonService();
