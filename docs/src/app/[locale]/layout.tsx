import { SEOSchema } from "@/components/seo-schema";
import { ThemeProvider } from "@/components/theme-provider";
import { locales } from "@/i18n";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const metadata = await getTranslations({ locale, namespace: "metadata" });
	const nav = await getTranslations({ locale, namespace: "nav" });

	const title = `${nav("brand")} - ${nav("slogan")}`;
	const description = metadata("description");
	const keywords = metadata("keywords");
	const siteUrl = SITE_URL;

	return {
		title,
		description,
		keywords,
		authors: [{ name: nav("brand") }],
		creator: nav("brand"),
		publisher: nav("brand"),
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		metadataBase: new URL(siteUrl),
		alternates: {
			canonical: "/",
			languages: {
				"en-US": "/en",
				"zh-CN": "/zh",
			},
		},
		openGraph: {
			type: "website",
			locale,
			title,
			description,
			siteName: nav("brand"),
			url: siteUrl,
			images: [
				{
					url: "/og-image.jpg",
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: ["/og-image.jpg"],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		verification: {
			google: "your-google-verification-code",
		},
		other: {
			"msapplication-TileColor": "#000000",
			"theme-color": "#000000",
			"apple-mobile-web-app-capable": "yes",
			"apple-mobile-web-app-status-bar-style": "default",
			"apple-mobile-web-app-title": title,
		},
		manifest: "/manifest.json",
	};
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!locales.includes(locale as any)) {
		notFound();
	}

	const messages = await getMessages({ locale });

	return (
		<NextIntlClientProvider messages={messages}>
			<ThemeProvider defaultTheme="system" storageKey="theme">
				<SEOSchema />
				{children}
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}
