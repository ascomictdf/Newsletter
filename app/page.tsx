"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  Download,
  Loader2,
  LogOut,
  Megaphone,
  Plane,
  UserPlus,
  UsersRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type PersonRecord = {
  name: string;
  role: string;
  area: string;
  date?: string;
  period?: string;
};

type OpenLists = Record<string, boolean>;

const admissions: PersonRecord[] = [
  {
    name: "Ana Laura Pereira Batista",
    role: "Técnico de Enfermagem",
    area: "CME",
    date: "24/08/2026",
  },
  {
    name: "Cristiana da Cruz Tristao",
    role: "Aux. de Serv. Gerais",
    area: "Higienização",
    date: "24/08/2026",
  },
  {
    name: "Franciangela Daniele Ferreira de Lima",
    role: "Técnico de Laboratório",
    area: "Laboratório",
    date: "24/08/2026",
  },
  {
    name: "Kathleen Loyane Alves Pereira",
    role: "Roupeiro",
    area: "Hotelaria",
    date: "24/08/2026",
  },
  {
    name: "Marina Oliveira Santana",
    role: "Auxiliar de Farmácia",
    area: "Farmácia Central",
    date: "24/08/2026",
  },
  {
    name: "Valdirene Cardoso Rowe",
    role: "Auxiliar de Farmácia",
    area: "Farmácia Central",
    date: "24/08/2026",
  },
];

const departures: PersonRecord[] = [
  {
    name: "Weberth de Oliveira",
    role: "Analista de Orçamento",
    area: "Núcleo de Programação Orçamentária de Prestação de Contas",
    date: "25/08/2026",
  },
  {
    name: "Scarlett Ferreira de Araujo",
    role: "Nutricionista",
    area: "Nutrição",
    date: "26/08/2026",
  },
  {
    name: "Dayana Barros Nogueira Mendes",
    role: "Aux. de Serv. Gerais",
    area: "Higienização",
    date: "25/08/2026",
  },
];

const vacations: PersonRecord[] = [
  {
    name: "Glaucia Pires Figueira de Mello",
    role: "Psicólogo Hospitalar",
    area: "Psicologia Clínica",
    period: "24/08/2026 a 29/08/2026",
  },
  {
    name: "Patricia da Silva Pereira",
    role: "Recepcionista I",
    area: "Recepção Central",
    period: "24/08/2026 a 08/09/2026",
  },
  {
    name: "Maria Ayumi Antunes Sato",
    role: "Assistente Social",
    area: "Serviço Social",
    period: "26/08/2026 a 05/09/2026",
  },
];

const featureArticle = {
  title:
    "ICTDF participa do 34º Congresso CMB e fortalece debates sobre o futuro da saúde filantrópica no Brasil",
  url: "https://ictdf.synergyecosys.io/?p=1586",
  meta: "21/08/2026 · Amanda Pereira",
  summary:
    "Representantes do Instituto acompanharam debates sobre sustentabilidade, inovação, gestão e qualidade assistencial durante um dos principais encontros da saúde filantrópica brasileira.",
};

const giroItems = [
  {
    tag: "Institucional",
    title: "Espaço para nova matéria do ICTDF",
    summary: "Inclua aqui o resumo de outra notícia publicada no portal ou nos canais internos.",
    image: "/congresso-cmb.png",
    accent: "text-[#008f5b]",
  },
  {
    tag: "Educação",
    title: "Espaço para ações de capacitação",
    summary: "Use este card para divulgar treinamentos, encontros técnicos e atividades de desenvolvimento.",
    image: "/og.png",
    accent: "text-[#0b62b4]",
  },
  {
    tag: "Comunidade",
    title: "Espaço para iniciativas solidárias",
    summary: "Reserve este espaço para campanhas, mutirões e iniciativas de cuidado com a comunidade.",
    image: "/ictdf-logo.png",
    accent: "text-[#ee1b35]",
  },
];

const agendaItems = [
  {
    date: "Definir data",
    title: "Ação institucional",
    detail: "Inclua aqui a ação, palestra ou atividade marcada para acontecer no ICTDF.",
    url: "#",
  },
  {
    date: "Definir data",
    title: "Palestra ou capacitação",
    detail: "Use este espaço para informar local, horário e público-alvo.",
    url: "#",
  },
  {
    date: "Definir data",
    title: "Evento interno",
    detail: "Adicione uma chamada curta para a equipe acompanhar a programação.",
    url: "#",
  },
];

async function loadImageDataUrl(src: string) {
  try {
    const response = await fetch(src);
    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export default function Home() {
  const newsletterRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [openLists, setOpenLists] = useState<OpenLists>({});

  async function downloadPdf() {
    if (!newsletterRef.current || isDownloading) return;

    setIsDownloading(true);

    try {
      const { jsPDF } = await import("jspdf");
      const logoDataUrl = await loadImageDataUrl("/ictdf-logo.png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 16;
      const maxWidth = pageWidth - margin * 2;
      const blue: [number, number, number] = [8, 42, 99];
      const red: [number, number, number] = [238, 27, 53];
      const green: [number, number, number] = [0, 143, 91];
      const lightBlue: [number, number, number] = [237, 244, 251];
      const slate: [number, number, number] = [48, 65, 95];
      let y = 58;

      const ensureSpace = (height: number) => {
        if (y + height > pageHeight - 24) {
          pdf.addPage();
          y = 18;
        }
      };

      const writeLines = (
        text: string,
        size = 10,
        color: [number, number, number] = slate,
        style: "normal" | "bold" = "normal",
        x = margin,
        width = maxWidth,
      ) => {
        pdf.setFont("helvetica", style);
        pdf.setFontSize(size);
        pdf.setTextColor(...color);
        const lines = pdf.splitTextToSize(text, width);
        ensureSpace(lines.length * (size * 0.42) + 4);
        pdf.text(lines, x, y);
        y += lines.length * (size * 0.42) + 5;
      };

      const sectionHeader = (title: string, accent: [number, number, number] = blue) => {
        ensureSpace(16);
        pdf.setFillColor(...accent);
        pdf.roundedRect(margin, y, maxWidth, 13, 2, 2, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setTextColor(255, 255, 255);
        pdf.text(title, margin + 5, y + 8.5);
        y += 19;
      };

      const drawHeader = () => {
        pdf.setFillColor(...blue);
        pdf.rect(0, 0, pageWidth, 45, "F");
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(margin, 8, 25, 28, 3, 3, "F");

        if (logoDataUrl) {
          pdf.addImage(logoDataUrl, "PNG", margin + 3.7, 10, 17.5, 23.5);
        }

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(25);
        pdf.setTextColor(255, 255, 255);
        pdf.text("ICTDF", margin + 33, 22);
        pdf.setFont("helvetica", "normal");
        pdf.text("Informa", margin + 66, 22);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.text("Edição 50 | 28 de agosto de 2026", margin + 33, 31);
        pdf.setFillColor(...red);
        pdf.roundedRect(margin + 33, 35, 44, 1.3, 0.6, 0.6, "F");
      };

      const drawInfoCard = (title: string, value: string, accent: [number, number, number], x: number, width: number) => {
        pdf.setFillColor(247, 250, 252);
        pdf.setDrawColor(217, 226, 239);
        pdf.roundedRect(x, y, width, 19, 2, 2, "FD");
        pdf.setFillColor(...accent);
        pdf.roundedRect(x + 3, y + 3, 15, 13, 2, 2, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);
        pdf.setTextColor(255, 255, 255);
        pdf.text(value, x + 7.5, y + 11.5, { align: "center" });
        pdf.setFontSize(8.5);
        pdf.setTextColor(...blue);
        pdf.text(title, x + 22, y + 11);
      };

      const drawFooter = (page: number, totalPages: number) => {
        pdf.setDrawColor(217, 226, 239);
        pdf.line(margin, pageHeight - 17, pageWidth - margin, pageHeight - 17);
        if (logoDataUrl) {
          pdf.addImage(logoDataUrl, "PNG", margin, pageHeight - 15, 8, 10);
        }
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7.5);
        pdf.setTextColor(...blue);
        pdf.text("Instituto de Cardiologia e Transplantes do Distrito Federal", margin + 11, pageHeight - 9);
        pdf.setTextColor(...slate);
        pdf.text(`${page}/${totalPages}`, pageWidth - margin, pageHeight - 9, { align: "right" });
      };

      const peopleList = (title: string, people: PersonRecord[], dateLabel = "Data") => {
        ensureSpace(18);
        const accent = title === "Admissões" ? green : title === "Desligamentos" ? red : [11, 98, 180] as [number, number, number];
        pdf.setFillColor(255, 255, 255);
        pdf.setDrawColor(217, 226, 239);
        pdf.roundedRect(margin, y - 2, maxWidth, 14, 2, 2, "FD");
        pdf.setFillColor(...accent);
        pdf.roundedRect(margin, y - 2, 2.5, 14, 1, 1, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.setTextColor(...blue);
        pdf.text(`${title} (${people.length.toString().padStart(2, "0")} registros)`, margin + 6, y + 6.5);
        y += 18;

        people.forEach((person) => {
          const date = person.date ?? person.period ?? "";
          const text = `${person.name}  |  ${person.role}  |  ${person.area}  |  ${dateLabel}: ${date}`;
          const lines = pdf.splitTextToSize(text, maxWidth - 8);
          ensureSpace(lines.length * 4.8 + 8);
          pdf.setFillColor(247, 250, 252);
          pdf.setDrawColor(217, 226, 239);
          pdf.roundedRect(margin, y - 4, maxWidth, lines.length * 4.8 + 5, 2, 2, "FD");
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(9);
          pdf.setTextColor(...slate);
          pdf.text(lines, margin + 4, y + 1);
          y += lines.length * 4.8 + 7;
        });
      };

      drawHeader();

      writeLines(
        "Newsletter do Instituto de Cardiologia e Transplantes do Distrito Federal. Documento com comunicados e movimentações de interesse dos colaboradores.",
        10.5,
        slate,
      );

      ensureSpace(24);
      const statGap = 4;
      const statWidth = (maxWidth - statGap * 2) / 3;
      drawInfoCard("ADMISSÕES", admissions.length.toString().padStart(2, "0"), green, margin, statWidth);
      drawInfoCard("DESLIGAMENTOS", departures.length.toString().padStart(2, "0"), red, margin + statWidth + statGap, statWidth);
      drawInfoCard("FÉRIAS", vacations.length.toString().padStart(2, "0"), [11, 98, 180], margin + (statWidth + statGap) * 2, statWidth);
      y += 28;

      sectionHeader("Giro ICTDF", blue);
      giroItems.forEach((item) => {
        ensureSpace(24);
        pdf.setFillColor(255, 255, 255);
        pdf.setDrawColor(217, 226, 239);
        pdf.roundedRect(margin, y - 3, maxWidth, 24, 2, 2, "FD");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.setTextColor(...red);
        pdf.text(item.tag.toUpperCase(), margin + 4, y + 3);
        pdf.setFontSize(10);
        pdf.setTextColor(...blue);
        pdf.text(pdf.splitTextToSize(item.title, maxWidth - 8), margin + 4, y + 9);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(...slate);
        pdf.text(pdf.splitTextToSize(item.summary, maxWidth - 8), margin + 4, y + 16);
        y += 29;
      });

      sectionHeader("Acontece ICTDF", red);
      agendaItems.forEach((item) => {
        ensureSpace(22);
        pdf.setFillColor(...blue);
        pdf.roundedRect(margin, y - 3, maxWidth, 22, 2, 2, "F");
        pdf.setFillColor(...red);
        pdf.roundedRect(margin + 4, y + 1, 27, 13, 2, 2, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7.8);
        pdf.setTextColor(255, 255, 255);
        pdf.text(item.date.toUpperCase(), margin + 17.5, y + 9, { align: "center" });
        pdf.setFontSize(10);
        pdf.text(item.title, margin + 36, y + 5);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(201, 216, 236);
        pdf.text(pdf.splitTextToSize(item.detail, maxWidth - 42), margin + 36, y + 11);
        y += 27;
      });

      sectionHeader("Gente que faz", [11, 98, 180]);
      pdf.setFillColor(...lightBlue);
      pdf.setDrawColor(217, 226, 239);
      pdf.roundedRect(margin, y - 3, maxWidth, 26, 2, 2, "FD");
      y += 5;
      writeLines(
        "Espaço para homenagear um colaborador, uma equipe ou uma trajetória que represente dedicação, cuidado e relevância para o ICTDF.",
        9.5,
        slate,
        "normal",
        margin + 5,
        maxWidth - 10,
      );
      y += 7;

      sectionHeader("Comunicados Institucionais", blue);
      writeLines("Setor: Gestão de Pessoas", 12, blue, "bold");
      writeLines("A Gerência de Gestão de Pessoas informa movimentações de colaboradores registradas nesta edição.");
      peopleList("Admissões", admissions);
      peopleList("Desligamentos", departures);
      peopleList("Férias", vacations, "Período");

      const totalPages = pdf.getNumberOfPages();
      for (let page = 1; page <= totalPages; page += 1) {
        pdf.setPage(page);
        drawFooter(page, totalPages);
      }

      pdf.setProperties({
        title: "ICTDF Informa - Edição 50",
        subject: "Newsletter corporativa ICTDF",
      });

      pdf.save("newsletter-ictdf-edicao-50.pdf");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#14213d]">
      <div className="fixed bottom-5 right-5 z-40 flex gap-2 print:hidden">
        <Button
          className="h-12 rounded-lg bg-[#ee1b35] px-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(238,27,53,0.22)] hover:bg-[#c8142a]"
          onClick={downloadPdf}
          type="button"
        >
          {isDownloading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
          {isDownloading ? "Preparando PDF" : "Baixar PDF"}
        </Button>
      </div>

      <section ref={newsletterRef} className="newsletter-shell mx-auto max-w-[1180px] bg-[#f6f8fb] px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-[#d9e2ef] bg-white shadow-[0_24px_70px_rgba(10,47,107,0.12)]">
          <header className="relative bg-white px-5 pb-7 pt-7 sm:px-9 lg:px-12">
            <div className="grid gap-7 lg:grid-cols-[220px_1fr] lg:items-center">
              <div className="flex items-center gap-4">
                <Image
                  alt="Logo ICTDF"
                  className="h-auto w-28"
                  height={225}
                  priority
                  src="/ictdf-logo.png"
                  width={190}
                />
                <span className="hidden h-28 w-px bg-[#c7d2e4] lg:block" />
              </div>

              <div className="animate-rise">
                <h1 className="text-5xl leading-none text-[#082a63] sm:text-7xl">
                  <span className="font-black">ICTDF</span>{" "}
                  <span className="font-extralight">Informa</span>
                </h1>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold text-[#082a63]">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-[#d9e2ef] px-3 py-2">
                    <CalendarDays className="size-4 text-[#ee1b35]" />
                    Edição 50
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-[#d9e2ef] px-3 py-2">
                    <Megaphone className="size-4 text-[#ee1b35]" />
                    28 de agosto de 2026
                  </span>
                </div>
              </div>
            </div>
          </header>

          <section className="border-y border-[#d9e2ef] bg-[#f7fafc] px-5 py-6 sm:px-9 lg:px-12">
            <div className="animate-rise grid gap-6 rounded-lg border border-[#d9e2ef] bg-white p-5 sm:p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.6fr)] lg:items-center">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[#ee1b35] px-3 py-1 text-xs font-black uppercase text-white">
                  Matéria da semana
                </span>
                <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight text-[#082a63] sm:text-3xl">
                  {featureArticle.title}
                </h2>
                <p className="mt-2 text-sm font-bold uppercase text-[#607089]">{featureArticle.meta}</p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#30415f]">{featureArticle.summary}</p>
                <a
                  className="mt-5 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#082a63] px-4 text-sm font-bold text-white transition hover:bg-[#0b3f88]"
                  href={featureArticle.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  Leia a matéria completa
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
              <Image
                alt="Representantes do ICTDF no 34º Congresso CMB"
                className="h-64 w-full rounded-lg object-cover sm:h-80 lg:h-[360px]"
                height={968}
                src="/congresso-cmb.png"
                width={973}
              />
            </div>
          </section>

          <GiroSection />

          <AgendaAndPeopleSection />

          <CommunicationsSection openLists={openLists} setOpenLists={setOpenLists} />

          <footer className="bg-[#082a63] px-5 py-6 text-white sm:px-9 lg:px-12">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex items-center gap-4">
                <Bell className="size-10 rounded-lg bg-[#ee1b35] p-2" />
                <div>
                  <p className="text-lg font-black uppercase">Fique atento</p>
                  <p className="text-sm leading-6 text-[#c9d8ec]">
                    Acompanhe os comunicados oficiais para não perder informações importantes.
                  </p>
                </div>
              </div>
              <p className="text-sm font-bold text-[#c9d8ec]">Instituto de Cardiologia e Transplantes do Distrito Federal</p>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  action,
  icon,
  inverted = false,
  title,
}: {
  action?: string;
  icon: ReactNode;
  inverted?: boolean;
  title: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className={`grid size-11 place-items-center rounded-full ${inverted ? "bg-white text-[#082a63]" : "bg-[#082a63] text-white"}`}>
          {icon}
        </span>
        <h2 className={`text-2xl font-black ${inverted ? "text-white" : "text-[#082a63]"}`}>{title}</h2>
        <span className={`hidden h-px w-28 sm:block ${inverted ? "bg-white/40" : "bg-[#ee1b35]"}`} />
      </div>
      {action ? <p className={`text-sm font-bold ${inverted ? "text-[#c9d8ec]" : "text-[#607089]"}`}>{action}</p> : null}
    </div>
  );
}

function PlaceholderLinkButton() {
  return (
    <button
      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-bold transition"
      style={{ color: "#082a63" }}
      type="button"
    >
      Inserir link da matéria
      <ArrowUpRight className="size-4" />
    </button>
  );
}

function GiroSection() {
  return (
    <section className="px-5 py-7 sm:px-9 lg:px-12">
      <SectionHeading action="Veja outras notícias" icon={<Megaphone className="size-5" />} title="Giro ICTDF" />
      <div className="grid gap-4 md:grid-cols-3">
        {giroItems.map((item) => (
          <article className="overflow-hidden rounded-lg border border-[#d9e2ef] bg-white shadow-[0_10px_26px_rgba(10,47,107,0.08)]" key={item.title}>
            <div className="h-36 bg-[#f7fafc]">
              <Image
                alt=""
                className={`h-full w-full object-cover ${item.image.includes("ictdf-logo") ? "object-contain p-7" : ""}`}
                height={420}
                src={item.image}
                width={640}
              />
            </div>
            <div className="p-4">
              <span className={`inline-flex rounded-lg bg-[#edf4fb] px-3 py-1 text-xs font-black uppercase ${item.accent}`}>
                {item.tag}
              </span>
              <h3 className="mt-3 min-h-14 text-base font-black leading-tight text-[#082a63]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#607089]">{item.summary}</p>
              <PlaceholderLinkButton />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AgendaAndPeopleSection() {
  return (
    <section className="grid gap-5 px-5 pb-7 sm:px-9 lg:grid-cols-[1fr_1fr] lg:px-12">
      <article className="rounded-lg bg-[#082a63] p-5 text-white">
        <SectionHeading icon={<CalendarDays className="size-5" />} inverted title="Acontece ICTDF" />
        <div className="space-y-3">
          {agendaItems.map((item) => (
            <div className="grid gap-4 rounded-lg bg-white/10 p-3 sm:grid-cols-[92px_1fr_auto] sm:items-center" key={item.title}>
              <span className="grid min-h-16 place-items-center rounded-lg bg-[#ee1b35] px-3 text-center text-xs font-black uppercase leading-4 text-white">
                {item.date}
              </span>
              <div>
                <h3 className="text-sm font-black">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#c9d8ec]">{item.detail}</p>
              </div>
              <AgendaItemButton url={item.url} />
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-lg border border-[#d9e2ef] bg-[#f7fafc] p-5">
        <SectionHeading icon={<UsersRound className="size-5" />} title="Gente que faz" />
        <div className="grid gap-5 sm:grid-cols-[1fr_150px] sm:items-center">
          <div>
            <p className="text-base leading-7 text-[#30415f]">
              Espaço para homenagear um colaborador, uma equipe ou uma trajetória que represente dedicação,
              cuidado e relevância para o ICTDF.
            </p>
            <p className="mt-4 font-black text-[#082a63]">
              Cada história fortalece a cultura de cuidado do Instituto.
            </p>
          </div>
          <div className="grid aspect-square place-items-center rounded-lg border border-[#d9e2ef] bg-white text-center text-sm font-black uppercase text-[#0b62b4]">
            Destaque da edição
          </div>
        </div>
      </article>
    </section>
  );
}

function AgendaItemButton({ url }: { url: string }) {
  const hasLink = url !== "#";
  const className =
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ee1b35] px-3 text-xs font-black uppercase text-white transition hover:bg-[#c8142a] sm:w-32";

  if (hasLink) {
    return (
      <a className={className} href={url} rel="noreferrer" target="_blank">
        Ver notícia
        <ArrowUpRight className="size-4" />
      </a>
    );
  }

  return (
    <button className={className} type="button">
      Inserir link
      <ArrowUpRight className="size-4" />
    </button>
  );
}

function CommunicationsSection({
  openLists,
  setOpenLists,
}: {
  openLists: OpenLists;
  setOpenLists: React.Dispatch<React.SetStateAction<OpenLists>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const totalUpdates = admissions.length + departures.length + vacations.length;

  if (totalUpdates === 0) {
    return null;
  }

  return (
    <section className="space-y-4 px-5 pb-8 sm:px-9 lg:px-12">
      <h2 className="text-2xl font-black text-[#082a63]">Comunicados Institucionais</h2>
      <button
        className="group grid w-full gap-3 rounded-lg border border-[#d9e2ef] bg-white p-4 text-left shadow-[0_10px_26px_rgba(10,47,107,0.07)] transition hover:-translate-y-0.5 hover:border-[#9bb4d4] hover:shadow-[0_16px_36px_rgba(10,47,107,0.12)] sm:grid-cols-[auto_1fr_auto] sm:items-center"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span className="grid size-11 place-items-center rounded-lg bg-[#082a63] text-white">
          <UsersRound className="size-5" />
        </span>
        <span>
          <span className="block text-xs font-black uppercase text-[#ee1b35]">Setor com atualizações</span>
          <span className="mt-1 block text-lg font-black text-[#082a63]">Gestão de Pessoas</span>
          <span className="mt-1 block text-sm leading-6 text-[#607089]">
            {totalUpdates.toString().padStart(2, "0")} registros nesta edição
          </span>
        </span>
        <span className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#edf4fb] px-4 text-sm font-black text-[#082a63] transition group-hover:bg-[#082a63] group-hover:text-white">
          Abrir
          <ArrowUpRight className="size-4" />
        </span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#082a63]/20 p-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            aria-modal="true"
            className="animate-rise relative max-h-[86vh] w-full max-w-5xl overflow-y-auto rounded-[22px] border border-[#d9e2ef] bg-white shadow-[0_28px_90px_rgba(8,42,99,0.25)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <header className="rounded-t-[22px] bg-[#082a63] px-5 py-5 pr-28 text-white sm:px-7">
              <p className="text-xs font-black uppercase text-[#7fd0ff]">Comunicados Institucionais</p>
              <h3 className="mt-2 text-2xl font-black text-white">Gestão de Pessoas</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#c9d8ec]">
                A Gerência de Gestão de Pessoas informa movimentações de colaboradores registradas nesta edição.
              </p>
            </header>

            <button
              aria-label="Fechar comunicados"
              className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X className="size-8 stroke-[3]" />
            </button>

            <div className="space-y-5 bg-[#f7fafc] p-4 sm:p-6">
              {admissions.length > 0 ? (
                <PeopleSection
                  accent="#008f5b"
                  id="admissions"
                  icon={<UserPlus className="size-5" />}
                  openLists={openLists}
                  people={admissions}
                  setOpenLists={setOpenLists}
                  subtitle="Novos colaboradores passam a integrar o quadro de funcionários do ICTDF."
                  title="Admissões"
                />
              ) : null}

              {departures.length > 0 ? (
                <PeopleSection
                  accent="#ee1b35"
                  id="departures"
                  icon={<LogOut className="size-5" />}
                  openLists={openLists}
                  people={departures}
                  setOpenLists={setOpenLists}
                  subtitle="Colaboradores abaixo deixam de fazer parte do quadro de funcionários da instituição."
                  title="Desligamentos"
                />
              ) : null}

              {vacations.length > 0 ? (
                <PeopleSection
                  accent="#0b62b4"
                  dateLabel="Período"
                  id="vacations"
                  icon={<Plane className="size-5" />}
                  openLists={openLists}
                  people={vacations}
                  setOpenLists={setOpenLists}
                  subtitle="Relação de colaboradores em gozo de férias."
                  title="Férias"
                />
              ) : null}
            </div>

            <div className="flex justify-end border-t border-[#d9e2ef] bg-white px-4 py-4 sm:px-6">
              <Button
                className="h-11 rounded-lg bg-[#082a63] px-6 text-sm font-black text-white hover:bg-[#0b3f88]"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function PeopleSection({
  accent,
  dateLabel = "Data",
  id,
  icon,
  openLists,
  people,
  setOpenLists,
  subtitle,
  title,
}: {
  accent: string;
  dateLabel?: string;
  id: string;
  icon: ReactNode;
  openLists: OpenLists;
  people: PersonRecord[];
  setOpenLists: React.Dispatch<React.SetStateAction<OpenLists>>;
  subtitle: string;
  title: string;
}) {
  const expanded = Boolean(openLists[id]);
  const visiblePeople = expanded ? people : people.slice(0, 3);
  const hiddenCount = people.length - 3;

  return (
    <section className="rounded-lg border border-[#d9e2ef] bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-sm font-black uppercase" style={{ color: accent }}>
            {icon}
            {title}
          </span>
          <p className="mt-1 text-sm leading-6 text-[#607089]">{subtitle}</p>
        </div>
        <span className="rounded-lg border border-[#d9e2ef] px-3 py-2 text-sm font-black text-[#082a63]">
          {people.length.toString().padStart(2, "0")} registros
        </span>
      </div>

      <div className="space-y-2">
        {visiblePeople.map((person, index) => (
          <article
            className="grid gap-2 rounded-lg border border-[#d9e2ef] bg-[#f7fafc] px-3 py-3 text-sm transition hover:border-[#9bb4d4] hover:bg-white md:grid-cols-[1.1fr_0.9fr_0.9fr_120px] md:items-center"
            key={person.name}
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <p className="font-black text-[#14213d]">{person.name}</p>
            <p className="font-bold text-[#30415f]">{person.role}</p>
            <p className="text-[#607089]">{person.area}</p>
            <p className="font-black text-[#082a63]">{person.date ?? person.period}</p>
          </article>
        ))}
      </div>

      {hiddenCount > 0 ? (
        <Button
          className="mt-3 h-9 rounded-lg border-[#d9e2ef] text-[#082a63]"
          onClick={() => setOpenLists((current) => ({ ...current, [id]: !current[id] }))}
          type="button"
          variant="outline"
        >
          {expanded ? "Visualizar menos" : `Visualizar mais ${hiddenCount}`}
          <ChevronDown className={`size-4 transition ${expanded ? "rotate-180" : ""}`} />
        </Button>
      ) : null}

      <p className="mt-3 text-xs font-bold uppercase text-[#9aa8ba]">{dateLabel}</p>
    </section>
  );
}
