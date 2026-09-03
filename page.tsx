"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Download,
  HeartPulse,
  Layers3,
  Loader2,
  LogOut,
  Megaphone,
  Plane,
  SearchCheck,
  Sparkles,
  UserPlus,
  UsersRound,
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

const sections = [
  { code: "01", title: "Gestão Organizacional", status: "Atualizado", icon: BriefcaseBusiness },
  { code: "02", title: "Atenção ao Paciente", status: "Sem atualizações", icon: HeartPulse },
  { code: "03", title: "Diagnóstico e Terapêutica", status: "Sem atualizações", icon: SearchCheck },
  { code: "04", title: "Gestão de Apoio", status: "Sem atualizações", icon: UsersRound },
  { code: "05", title: "Ensino", status: "Sem atualizações", icon: BadgeCheck },
  { code: "06", title: "Pesquisa", status: "Sem atualizações", icon: Sparkles },
];

const featureArticle = {
  title:
    "ICTDF participa do 34º Congresso CMB e fortalece debates sobre o futuro da saúde filantrópica no Brasil",
  url: "https://ictdf.synergyecosys.io/?p=1586",
  meta: "21/08/2026 · Amanda Pereira",
  summary:
    "Representantes do Instituto acompanharam debates sobre sustentabilidade, inovação, gestão e qualidade assistencial durante um dos principais encontros da saúde filantrópica brasileira.",
};

export default function Home() {
  const newsletterRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [openLists, setOpenLists] = useState<OpenLists>({});

  async function downloadPdf() {
    if (!newsletterRef.current || isDownloading) return;

    setIsDownloading(true);

    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 16;
      const maxWidth = pageWidth - margin * 2;
      let y = 18;

      const ensureSpace = (height: number) => {
        if (y + height > pageHeight - 16) {
          pdf.addPage();
          y = 18;
        }
      };

      const writeLines = (text: string, size = 10, color: [number, number, number] = [48, 65, 95]) => {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(size);
        pdf.setTextColor(...color);
        const lines = pdf.splitTextToSize(text, maxWidth);
        ensureSpace(lines.length * (size * 0.42) + 4);
        pdf.text(lines, margin, y);
        y += lines.length * (size * 0.42) + 5;
      };

      const sectionHeader = (code: string, title: string) => {
        ensureSpace(16);
        pdf.setFillColor(8, 42, 99);
        pdf.roundedRect(margin, y, maxWidth, 12, 2, 2, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.setTextColor(255, 255, 255);
        pdf.text(`${code} - ${title}`, margin + 5, y + 8);
        y += 18;
      };

      const peopleList = (title: string, people: PersonRecord[], dateLabel = "Data") => {
        ensureSpace(14);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setTextColor(8, 42, 99);
        pdf.text(`${title} (${people.length.toString().padStart(2, "0")} registros)`, margin, y);
        y += 7;

        people.forEach((person) => {
          const date = person.date ?? person.period ?? "";
          const text = `${person.name} | ${person.role} | ${person.area} | ${dateLabel}: ${date}`;
          const lines = pdf.splitTextToSize(text, maxWidth - 8);
          ensureSpace(lines.length * 4.8 + 9);
          pdf.setFillColor(247, 250, 252);
          pdf.setDrawColor(217, 226, 239);
          pdf.roundedRect(margin, y - 4, maxWidth, lines.length * 4.8 + 6, 2, 2, "FD");
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(9);
          pdf.setTextColor(20, 33, 61);
          pdf.text(lines, margin + 4, y + 1);
          y += lines.length * 4.8 + 8;
        });
      };

      pdf.setFillColor(8, 42, 99);
      pdf.rect(0, 0, pageWidth, 34, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(255, 255, 255);
      pdf.text("ICTDF Informa", margin, 19);
      pdf.setFontSize(10);
      pdf.text("Edição 50 | 28 de agosto de 2026", margin, 27);
      y = 44;

      writeLines(
        "Boletim corporativo do Instituto de Cardiologia e Transplantes do Distrito Federal. Documento com comunicados e movimentações de interesse dos colaboradores.",
      );

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(13);
      pdf.setTextColor(8, 42, 99);
      pdf.text("Editorias do boletim", margin, y);
      y += 8;
      sections.forEach((section) => {
        const color: [number, number, number] = section.status === "Atualizado" ? [0, 143, 91] : [238, 27, 53];
        writeLines(`${section.code}. ${section.title} - ${section.status}`, 9.5, color);
      });

      sectionHeader("01", "Gestão Organizacional");
      writeLines("01.05 - Gestão de Pessoas");
      writeLines("A Gerência de Gestão de Pessoas informa movimentações de colaboradores registradas nesta edição.");
      peopleList("Admissões", admissions);
      peopleList("Desligamentos", departures);
      peopleList("Férias", vacations, "Período");

      sections.slice(1).forEach((section) => {
        sectionHeader(section.code, section.title);
        writeLines("Não há atualizações para esta editoria nesta edição.");
      });

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
                <p className="text-sm font-bold uppercase text-[#ee1b35]">Boletim corporativo</p>
                <h1 className="mt-2 text-5xl font-black leading-none text-[#082a63] sm:text-7xl">
                  ICTDF Informa
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
            <div className="animate-rise grid gap-5 rounded-lg border border-[#d9e2ef] bg-white p-5 sm:p-6 md:grid-cols-[150px_1fr] lg:grid-cols-[170px_1fr_auto] lg:items-center">
              <Image
                alt="Representantes do ICTDF no 34º Congresso CMB"
                className="h-32 w-full rounded-lg object-cover md:h-36"
                height={968}
                src="/congresso-cmb.png"
                width={973}
              />
              <div>
                <span className="inline-flex items-center gap-2 rounded-lg bg-[#ee1b35] px-3 py-1 text-xs font-black uppercase text-white">
                  Matéria da semana
                </span>
                <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight text-[#082a63] sm:text-3xl">
                  {featureArticle.title}
                </h2>
                <p className="mt-2 text-sm font-bold uppercase text-[#607089]">{featureArticle.meta}</p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#30415f]">{featureArticle.summary}</p>
              </div>
              <a
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#082a63] px-4 text-sm font-bold text-white transition hover:bg-[#0b3f88]"
                href={featureArticle.url}
                rel="noreferrer"
                target="_blank"
              >
                Ler matéria
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </section>

          <section className="px-5 py-6 sm:px-9 lg:px-12">
            <div className="mb-5 flex items-center gap-3">
              <Layers3 className="size-6 text-[#ee1b35]" />
              <h2 className="text-xl font-black text-[#082a63]">Editorias do boletim</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <div className="rounded-lg border border-[#d9e2ef] bg-[#f7fafc] p-4" key={section.title}>
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-[#0b62b4]" />
                      <div>
                        <p className="text-sm font-black text-[#082a63]">
                          {section.code} · {section.title}
                        </p>
                        <p
                          className={`text-xs font-bold ${
                            section.status === "Atualizado" ? "text-[#008f5b]" : "text-[#ee1b35]"
                          }`}
                        >
                          {section.status}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="space-y-6 px-5 pb-8 sm:px-9 lg:px-12">
            <CategorySection code="01" icon={<BriefcaseBusiness className="size-6" />} title="Gestão Organizacional">
              <div className="rounded-lg border border-[#d9e2ef] bg-[#f7fafc] p-5">
                <p className="text-sm font-black uppercase text-[#ee1b35]">01.05 · Gestão de Pessoas</p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#30415f]">
                  A Gerência de Gestão de Pessoas informa movimentações de colaboradores registradas nesta edição.
                </p>
              </div>

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
            </CategorySection>
          </div>

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

function CategorySection({
  children,
  code,
  icon,
  title,
}: {
  children: ReactNode;
  code: string;
  icon: ReactNode;
  title: string;
}) {
  return (
    <section className="animate-rise overflow-hidden rounded-lg border border-[#d9e2ef] bg-white">
      <header className="flex items-center gap-4 border-b border-[#d9e2ef] bg-[#082a63] px-5 py-4 text-white">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white/10 text-base font-black">{code}</span>
        <div className="text-[#7fd0ff]">{icon}</div>
        <h2 className="text-xl font-black">{title}</h2>
      </header>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
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
