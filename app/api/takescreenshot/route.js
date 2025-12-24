import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");  // Ensure this matches frontend
    console.log("hello");

    if (!url) {
        return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        // Take a full-page screenshot
        const screenshot = await page.screenshot({ encoding: "base64", fullPage: true });

        await browser.close();
        
        console.log("Screenshot captured:", screenshot ? "Success" : "Failed");
        return NextResponse.json({ image: `data:image/png;base64,${screenshot}` });
    } catch (error) {
        console.error("Screenshot Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
