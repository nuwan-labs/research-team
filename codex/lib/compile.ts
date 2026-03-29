import type { Artifact, Citation, Project } from '@prisma/client';
import { StageId } from './stages';

export type TestResult = {
  name: string;
  status: 'PASS' | 'FAIL';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
};

const getArtifact = (artifacts: Artifact[], stage: StageId) =>
  artifacts.find((artifact) => artifact.stage === stage);

const parseContent = (artifact?: Artifact) => {
  if (!artifact) return {};
  if (typeof artifact.content === 'string') {
    try {
      return JSON.parse(artifact.content);
    } catch {
      return {};
    }
  }
  return artifact.content as Record<string, unknown>;
};

const getText = (artifact?: Artifact) => {
  if (!artifact) return '';
  const content = parseContent(artifact) as { text?: string; sections?: Record<string, string> };
  return [content.text, ...(content.sections ? Object.values(content.sections) : [])]
    .filter(Boolean)
    .join(' ');
};

export function compileBuild(
  project: Project,
  artifacts: Artifact[],
  citations: Citation[]
) {
  const question = getText(getArtifact(artifacts, 'QUESTION'));
  const hypotheses = getText(getArtifact(artifacts, 'HYPOTHESES'));
  const methods = getArtifact(artifacts, 'METHODS');
  const analysis = getArtifact(artifacts, 'ANALYSIS');

  const tests: TestResult[] = [];

  const citationCoverage = citations.length >= 2;
  tests.push({
    name: 'Citation Coverage',
    status: citationCoverage ? 'PASS' : 'FAIL',
    severity: citationCoverage ? 'INFO' : 'WARNING',
    message: citationCoverage
      ? `Citations present (${citations.length}).`
      : 'Add at least two citations to support claims.'
  });

  const ethicsFlag = /human|patient|subject|clinical/i.test(
    `${question} ${hypotheses} ${getText(analysis)}`
  );
  tests.push({
    name: 'Ethics Check',
    status: ethicsFlag ? 'FAIL' : 'PASS',
    severity: ethicsFlag ? 'CRITICAL' : 'INFO',
    message: ethicsFlag
      ? 'Human/clinical terms detected. Provide ethics review details.'
      : 'No human/clinical signals detected.'
  });

  const methodsContent =
    (parseContent(methods) as { controls?: string; materials?: string }) || {};
  const hasControls = Boolean(methodsContent.controls && methodsContent.controls.trim().length > 0);
  tests.push({
    name: 'Protocol Completeness',
    status: hasControls ? 'PASS' : 'FAIL',
    severity: hasControls ? 'INFO' : 'WARNING',
    message: hasControls ? 'Controls documented.' : 'Add control experiments.'
  });

  const analysisContent =
    (parseContent(analysis) as { sampleSize?: number }) || {};
  const hasPower = typeof analysisContent.sampleSize === 'number' && analysisContent.sampleSize >= 30;
  tests.push({
    name: 'Power Check',
    status: hasPower ? 'PASS' : 'FAIL',
    severity: hasPower ? 'INFO' : 'WARNING',
    message: hasPower
      ? `Sample size ${analysisContent.sampleSize} looks adequate.`
      : 'Provide a sample size (>= 30) or justify smaller cohorts.'
  });

  const failing = tests.some((test) => test.status === 'FAIL');
  const summary = failing
    ? 'Build failed one or more tests. Review warnings and rerun.'
    : 'Build passed all tests.';

  return { tests, status: failing ? 'FAIL' : 'PASS', summary };
}
