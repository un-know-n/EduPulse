import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DefaultButton } from '../../../auth/shared/buttons/DefaultButton';

interface CertificateProps {
  title: string;
  completion: number;
  user: string;
  dateIssue: string;
  author: string;
  buttonText?: string;
}

const GenerateCertificateButton: React.FC<CertificateProps> = ({
  title,
  completion,
  user,
  dateIssue,
  author,
  buttonText,
}) => {
  const generateCertificate = () => {
    const certificateDiv = document.createElement('div');
    certificateDiv.style.width = '1000px';
    certificateDiv.style.height = 'auto';
    certificateDiv.style.display = 'block';
    certificateDiv.style.background = '#F3F4FD';
    certificateDiv.style.paddingTop = '30px';
    certificateDiv.style.paddingBottom = '30px';
    certificateDiv.style.borderColor = '#3B2F6B';
    certificateDiv.style.borderWidth = '1px';
    certificateDiv.style.borderStyle = 'solid';

    certificateDiv.innerHTML = `
      <div style="
        display: flex;
        height: 100px;
        padding-left: 50px;
        padding-right: 50px;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(90deg, rgba(178,121,234,1) 0%, rgba(58,46,106,1) 100%);
      ">
        <p style="
          font-size: 24px;
          font-weight: bold;
        ">PolyWit - сучасна та доступна освіта без перешкод!</p>
        <div style="text-align: right;">
          <p style="
            font-size: 24px;
            font-weight: bold;
          ">СЕРТИФІКАТ</p>
          <p style="
            font-size: 18px;
            font-weight: initial;
          ">Виданий ${dateIssue}</p>
        </div>
      </div>
      <div style="
        padding-left: 50px;
        padding-right: 50px;
        padding-top: 30px;
        padding-bottom: 30px;
        gap: 20px;
      ">
        <p style="
          color: #6A4C9D;
          font-size: 20px;
        ">Цей сертифікат засвідчує, що</p>
        <p style="
          color: #6A4C9D;
          font-size: 36px;
          font-weight: bold;
        ">${user}</p>
        <p style="
          color: #6A4C9D;
          font-size: 20px;
        ">успішно закінчив(-ла) курс</p>
        <p style="
          color: #9869CE;
          font-size: 30px;
          font-weight: bold;
        ">${title},</p>
        <p style="
          color: #6A4C9D;
          font-size: 20px;
        ">наданий автором <strong>${author}</strong> через платформу онлайн-освіти <strong>PolyWit</strong>.</p>
      </div>
      <div style="
        background: linear-gradient(90deg, rgba(178,121,234,1) 0%, rgba(58,46,106,1) 100%);
        padding-right: 50px;
        padding-top: 20px;
        padding-bottom: 20px;
        text-align: right;
      ">
        <p style="
          color: white;
          font-size: 18px;
        ">Студент завершив курс чудово з результатом проходження <strong>${completion}%</strong>!</p>
      </div>
    `;

    document.body.appendChild(certificateDiv);

    html2canvas(certificateDiv, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const width = certificateDiv.offsetWidth;
      const height = certificateDiv.offsetHeight;

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const xPosition = (pdfWidth - width * 0.264583) / 2;
      const yPosition = (pdfHeight - height * 0.264583) / 2;

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        xPosition,
        yPosition,
        width * 0.264583,
        height * 0.264583,
      );

      pdf.save('certificate.pdf');
      document.body.removeChild(certificateDiv);
    });
  };

  return (
    <DefaultButton
      mt='20px'
      onClick={generateCertificate}>
      {buttonText || 'Завантажити сертифікат (PDF)'}
    </DefaultButton>
  );
};

export default GenerateCertificateButton;
