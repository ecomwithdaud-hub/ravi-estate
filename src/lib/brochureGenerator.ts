import { COMPANY_INFO, MADINA_FLAGSHIP_DATA, PAKISTAN_PORTFOLIO } from "./data";

/**
 * Generates a valid, multi-page PDF 1.4 binary document containing the
 * Value Apartments - Madina Al Munawwarah (Wadi Mubarak) Official Brochure
 * & Ravi Estate Track Record Portfolio, and triggers a browser file download.
 */
export function downloadOfficialBrochurePDF() {
  const linesPage1 = [
    "RAVI ESTATE  |  raviestate.com  |  Deals in all kinds of properties.",
    "OFFICIAL INTERNATIONAL INVESTMENT DOSSIER & BROCHURE",
    "==========================================================================",
    "PROJECT: VALUE APARTMENTS - MADINA AL MUNAWWARAH (WADI MUBARAK)",
    "Developer: Value Group   |   Advisory Partner: Ravi Estate",
    "Location: Wadi Mubarak, First Ring Road Corridor, Madina Al Munawwarah, KSA",
    "--------------------------------------------------------------------------",
    "STRATEGIC PROXIMITY & SPIRITUAL CONNECTIVITY:",
    "  * 10 Minutes Drive to Al-Masjid an-Nabawi (The Prophet's Mosque)",
    "  * Direct Access to Haramain High-Speed Railway Station (8 Mins)",
    "  * 8 km from Prince Mohammad bin Abdulaziz International Airport",
    "  * 12 Mins to Masjid Quba  |  14 Mins to Uhud Mountain",
    "  * 5 Mins to King Fahad Hospital & Al Khalidiyyah Park",
    "  * 12 Mins to King Fahad Central Park & 15 Mins to Masjid al-Qiblatayn",
    "--------------------------------------------------------------------------",
    "LUXURY & SMART LIVING AMENITIES:",
    "  * Integrated IoT Smart Home Automation (Climate, Lighting, Biometric Lock)",
    "  * 24/7 Five-Star Hotel Concierge, Reception & Multilingual Security",
    "  * Dedicated Haram Shuttle Service & Underground Resident Parking",
    "  * Spiritual Prayer Halls & Rooftop Contemplation Lounges",
    "  * Turnkey Hospitality & Rental Yield Management for Diaspora Investors",
    "--------------------------------------------------------------------------",
    "UNIT CONFIGURATIONS & FLEXIBLE 36-MONTH PAYMENT PLAN:",
    "  1. Executive Studio Suite (485 - 560 Sq.Ft.)     | SAR 420,000 - 495,000",
    "  2. 1-Bedroom Luxury Residence (780 - 910 Sq.Ft.) | SAR 680,000 - 790,000",
    "  3. 2-Bedroom Family Sanctuary (1180-1350 Sq.Ft.) | SAR 980,000 - 1,180,000",
    "  4. Royal Wadi Penthouse (2,100+ Sq.Ft.)          | SAR 1,850,000+",
    "  * Booking: 30% Down Payment | Balance over 36 Monthly Installments",
    "--------------------------------------------------------------------------",
    "PROVEN PAKISTAN TRACK RECORD (VALUE GROUP x RAVI ESTATE):",
    "  * Green View Executive Apartments (DHA Phase 5, Lahore)",
    "  * Value Apartments (PECO Road, Link Road, Model Town Lahore)",
    "  * Value Residencies (Barki Road, Opposite DHA Phase 8 Lahore)",
    "  * Green View Smart Homes (DHA Phase 12 EME, Lahore)",
    "  * Corporate Tower (Gulberg, Lahore)",
    "  * Value Lahore Organic Farmhouses (Barki Road, Lahore)",
    "==========================================================================",
    `Pakistan Advisory: ${COMPANY_INFO.pakistanPhone}  |  KSA Desk: ${COMPANY_INFO.saudiPhone}`,
    `Web: ${COMPANY_INFO.domain}  |  IG: ${COMPANY_INFO.instagramHandle}  |  FB: ${COMPANY_INFO.facebookName}`,
  ];

  const escapePdfText = (str: string) =>
    str.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

  let streamContent = "BT\n/F1 11 Tf\n15 TL\n42 790 Td\n";
  linesPage1.forEach((line, idx) => {
    if (idx === 0 || idx === 1 || idx === 3) {
      streamContent += `/F2 11.5 Tf\n(${escapePdfText(line)}) Tj\nT*\n/F1 9.5 Tf\n`;
    } else {
      streamContent += `(${escapePdfText(line)}) Tj\nT*\n`;
    }
  });
  streamContent += "ET";

  const objects: string[] = [];
  objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  objects.push("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  objects.push(
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /MediaBox [0 0 595 842] /Contents 6 0 R >>\nendobj\n"
  );
  objects.push(
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"
  );
  objects.push(
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n"
  );
  objects.push(
    `6 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream\nendobj\n`
  );

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Value-Apartments-Madina-Wadi-Mubarak-Ravi-Estate-Brochure.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

export { MADINA_FLAGSHIP_DATA, PAKISTAN_PORTFOLIO };
