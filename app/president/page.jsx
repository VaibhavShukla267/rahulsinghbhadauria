"use client"
import { Feather } from "lucide-react";
import React from "react";
import { useTranslation } from "../../contexts/TranslationContext";

const PresidentQuote = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-bold pt-10 pb-8 flex items-center gap-2 text-[#641526]">
          <Feather />
          {t("president.ideologyHeading")}
        </h1>
        <div className="w-[100px] h-[10px] bg-[#641526] rounded-3xl mb-10 relative -top-4"></div>
      </div>

      <div className="flex items-center justify-center pb-24 px-4">
        <div className="flex flex-col md:flex-row items-start bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl border border-amber-900/10 relative gap-6">
          {/* Image Section */}
          <div className="w-full md:w-1/3 shrink-0 flex flex-col items-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-amber-200">
              <img
                src="/president.png"
                alt={t("president.imageAlt")}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-amber-50/90 border border-amber-200/80 p-3 rounded-2xl shadow-sm w-full mt-3 flex items-center justify-center flex-col text-center">
              <p className="text-[#641526] font-extrabold text-lg">
                {t("president.name")}
              </p>
              <p className="text-xs font-semibold text-amber-800">{t("president.title")}</p>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full text-left">
            <h2 className="text-2xl font-extrabold text-[#641526] mb-3 pb-2 border-b border-amber-100">
              {t("president.messageHeading")}
            </h2>
            <p className="text-gray-700 mb-6 text-base leading-relaxed font-serif italic bg-amber-50/50 p-4 rounded-xl border-l-4 border-[#C79A45]">
              {t("president.message")}
            </p>
            
            <div className="text-gray-800 space-y-4 leading-relaxed text-sm md:text-base">
              {t("president.subheading1") && (
                <div>
                  <h3 className="font-bold text-[#641526] text-base mb-1">
                    {t("president.subheading1")}
                  </h3>
                  <p className="text-gray-700">{t("president.paragraph1")}</p>
                </div>
              )}

              {t("president.subheading2") && (
                <div>
                  <h3 className="font-bold text-[#641526] text-base mb-1">
                    {t("president.subheading2")}
                  </h3>
                  <p className="text-gray-700">{t("president.paragraph2")}</p>
                </div>
              )}

              {t("president.subheading3") && (
                <div>
                  <h3 className="font-bold text-[#641526] text-base mb-1">
                    {t("president.subheading3")}
                  </h3>
                  <p className="text-gray-700">{t("president.paragraph3")}</p>
                </div>
              )}

              {t("president.subheading4") && (
                <div>
                  <h3 className="font-bold text-[#641526] text-base mb-1">
                    {t("president.subheading4")}
                  </h3>
                  <p className="text-gray-700">{t("president.paragraph4")}</p>
                </div>
              )}

              {t("president.subheading5") && (
                <div>
                  <h3 className="font-bold text-[#641526] text-base mb-1">
                    {t("president.subheading5")}
                  </h3>
                  <p className="text-gray-700">{t("president.paragraph5")}</p>
                </div>
              )}

              {t("president.subheading6") && (
                <div>
                  <h3 className="font-bold text-[#641526] text-base mb-1">
                    {t("president.subheading6")}
                  </h3>
                  <p className="text-gray-700">{t("president.paragraph6")}</p>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-amber-100 text-center">
                <p className="text-lg font-bold text-[#641526] mb-1">
                  {t("president.slogan1")}
                </p>
                <p className="text-md font-extrabold text-[#C79A45]">{t("president.slogan2")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PresidentQuote;