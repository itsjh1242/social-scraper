export default async function fetchVercelInvironment(req, res) {
  const youtubeAPIKey = process.env.YOUTUBE_API_KEY;
  const BrowserRouterBaseName = process.env.BROWSER_ROUTER_BASE_NAME;

  return res.status(200).json({
    youtubeAPIKey,
    BrowserRouterBaseName,
  });
}
