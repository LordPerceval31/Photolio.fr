"use server";

import prisma from "@/app/lib/prisma";
import { getAuthenticatedUser } from "@/app/lib/auth-guard";
import { revalidatePath } from "next/cache";

export type VitrineData = {
  heroSubtitle: string;
  heroName: string;
  heroTagline: string;
  bioTitle: string;
  bioParagraph1: string;
  bioParagraph2: string;
  storyParagraph1: string;
  storyParagraph2: string;
  darkQuote: string;
  darkQuoteAuthor: string;
  contactText: string;
  seoTitle: string;
  seoDescription: string;
  seoLocation: string;
};

export async function updateVitrineTexts(data: VitrineData) {
  const user = await getAuthenticatedUser();
  if (!user) return { error: "Non autorisé" };

  const userId = user.id;

  try {
    const [, userRecord] = await Promise.all([
      prisma.siteConfig.upsert({
        where: { userId },
        update: data,
        create: { ...data, userId },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { subdomain: true },
      }),
    ]);

    revalidatePath("/dashboard/vitrine");
    if (userRecord?.subdomain) {
      // Invalide toutes les pages du portfolio public (layout + sous-pages)
      revalidatePath(`/${userRecord.subdomain}`, "layout");
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erreur BDD" };
  }
}
