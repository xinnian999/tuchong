"use client";

import { REPOSITORY_URL, SITE_URL } from "@/lib/site";
import { useLocale, useTranslations } from "next-intl";

export function SEOSchema() {
	const t = useTranslations("metadata");
	const locale = useLocale();

	const baseUrl = SITE_URL;
	const title = locale === "zh" ? "图虫 Tuchong" : "Tuchong";
	const description = t("description");

	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: title,
		url: baseUrl,
		logo: `${baseUrl}/logo.png`,
		description,
		sameAs: [REPOSITORY_URL],
	};

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: title,
		url: baseUrl,
		description,
		inLanguage: locale,
		publisher: {
			"@type": "Organization",
			name: title,
		},
	};

	const softwareSchema = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: title,
		description,
		url: baseUrl,
		applicationCategory: "AI Image Generation",
		operatingSystem: "Web Browser",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		creator: {
			"@type": "Organization",
			name: title,
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for structured data
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(organizationSchema),
				}}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for structured data
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(websiteSchema),
				}}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for structured data
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(softwareSchema),
				}}
			/>
		</>
	);
}
