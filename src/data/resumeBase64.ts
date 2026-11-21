import { jsPDF } from 'jspdf';
import { portfolioData } from './portfolioData';

const LOCAL_RESUME_PDF_PATH = `${import.meta.env.BASE_URL}Navaneeth_B_Resume.pdf`;

function sanitizePdfText(text: string): string {
  return text
    .replace(/[–—]/g, '-')
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/·/g, '|')
    .trim();
}

export function generateResumePdfBlob(): Blob {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 42;
  const marginTop = 42;
  const marginBottom = 42;
  const contentWidth = pageWidth - marginX * 2;
  let y = marginTop;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - marginBottom) {
      doc.addPage();
      y = marginTop;
    }
  };

  const drawSectionHeader = (title: string) => {
    ensureSpace(28);
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), marginX, y);
    y += 5;
    doc.setDrawColor(148, 163, 184);
    doc.setLineWidth(0.75);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 13;
  };

  const drawWrappedText = (
    text: string,
    x: number,
    maxWidth: number,
    fontSize: number,
    lineHeight: number,
    fontStyle: 'normal' | 'bold' | 'italic' = 'normal',
    color: [number, number, number] = [51, 65, 85]
  ) => {
    doc.setFont('helvetica', fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(sanitizePdfText(text), maxWidth) as string[];
    for (const line of lines) {
      ensureSpace(lineHeight);
      doc.text(line, x, y);
      y += lineHeight;
    }
  };

  // Header: Name & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(15, 23, 42);
  doc.text(sanitizePdfText(portfolioData.personal.name.toUpperCase()), marginX, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(8, 145, 178);
  doc.text(sanitizePdfText(portfolioData.personal.title), pageWidth - marginX, y, { align: 'right' });
  y += 16;

  // Contact row (only includes configured fields; omits private env fields if unset)
  const contactSegments = [
    portfolioData.personal.location,
    portfolioData.personal.email,
    portfolioData.personal.phone,
    portfolioData.personal.socials.github,
  ].filter(Boolean);

  drawWrappedText(contactSegments.join('  |  '), marginX, contentWidth, 8.8, 12, 'normal', [71, 85, 105]);
  y += 2;
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(1);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 8;

  // Summary
  drawSectionHeader('Summary');
  drawWrappedText(portfolioData.personal.bio, marginX, contentWidth, 9.2, 13, 'normal', [51, 65, 85]);

  // Experience
  drawSectionHeader('Experience');
  for (const exp of portfolioData.experiences) {
    ensureSpace(38);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(15, 23, 42);
    doc.text(sanitizePdfText(exp.role), marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(sanitizePdfText(exp.period), pageWidth - marginX, y, { align: 'right' });
    y += 12;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(sanitizePdfText(`${exp.company} - ${exp.location}`), marginX, y);
    y += 12;

    for (const resp of exp.responsibilities) {
      drawWrappedText(`- ${resp}`, marginX + 8, contentWidth - 8, 9, 12.2, 'normal', [51, 65, 85]);
    }
    y += 4;
  }

  // Education
  drawSectionHeader('Education');
  for (const edu of portfolioData.education) {
    ensureSpace(32);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(15, 23, 42);
    doc.text(sanitizePdfText(edu.degree), marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(sanitizePdfText(edu.period), pageWidth - marginX, y, { align: 'right' });
    y += 12;

    drawWrappedText(edu.institution, marginX, contentWidth, 9, 12.2, 'italic', [71, 85, 105]);
    if (edu.details) {
      drawWrappedText(edu.details, marginX, contentWidth, 8.8, 11.8, 'normal', [51, 65, 85]);
    }
    y += 3;
  }

  // Projects
  drawSectionHeader('Projects');
  for (const project of portfolioData.projects) {
    ensureSpace(36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(15, 23, 42);
    doc.text(sanitizePdfText(project.title), marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(sanitizePdfText(project.year), pageWidth - marginX, y, { align: 'right' });
    y += 12;

    drawWrappedText(project.description, marginX, contentWidth, 9, 12.2, 'normal', [51, 65, 85]);
    for (const feat of project.features.slice(0, 3)) {
      drawWrappedText(`- ${feat}`, marginX + 8, contentWidth - 8, 8.8, 11.8, 'normal', [71, 85, 105]);
    }
    drawWrappedText(
      `Technologies: ${project.technologies.join(', ')}`,
      marginX + 8,
      contentWidth - 8,
      8.6,
      11.5,
      'italic',
      [15, 23, 42]
    );
    y += 4;
  }

  // Technical Skills
  drawSectionHeader('Technical Skills');
  for (const cat of portfolioData.skillCategories) {
    const skillNames = cat.skills.map((s) => s.name).join(', ');
    drawWrappedText(`${cat.title}: ${skillNames}`, marginX, contentWidth, 9, 12.5, 'normal', [51, 65, 85]);
  }

  return doc.output('blob');
}

let cachedStaticPdfAvailable: boolean | null = null;

if (typeof window !== 'undefined') {
  isLocalResumePdfAvailable()
    .then((available) => {
      cachedStaticPdfAvailable = available;
    })
    .catch(() => {
      cachedStaticPdfAvailable = false;
    });
}

export async function isLocalResumePdfAvailable(): Promise<boolean> {
  if (cachedStaticPdfAvailable !== null) {
    return cachedStaticPdfAvailable;
  }
  try {
    const response = await fetch(LOCAL_RESUME_PDF_PATH, { method: 'HEAD' });
    const contentType = response.headers.get('content-type') || '';
    const available = response.ok && contentType.toLowerCase().includes('application/pdf');
    cachedStaticPdfAvailable = available;
    return available;
  } catch {
    cachedStaticPdfAvailable = false;
    return false;
  }
}

export async function downloadResumePdf(filename = 'Navaneeth_B_Resume.pdf'): Promise<boolean> {
  if (cachedStaticPdfAvailable === true) {
    const link = document.createElement('a');
    link.href = LOCAL_RESUME_PDF_PATH;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }

  try {
    const blob = generateResumePdfBlob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 15000);
    return true;
  } catch (error) {
    console.error('Failed to generate resume PDF, falling back to print dialog', error);
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
    return false;
  }
}

export function getResumePdfBlobUrl(): string {
  try {
    const blob = generateResumePdfBlob();
    return URL.createObjectURL(blob);
  } catch {
    return LOCAL_RESUME_PDF_PATH;
  }
}
