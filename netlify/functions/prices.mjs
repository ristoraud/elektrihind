export async function handler(event) {
  const { start, end } = event.queryStringParameters || {};

  if (!start || !end) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing start or end" }) };
  }

  const url = `https://dashboard.elering.ee/api/nps/price?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Elering API viga: " + err.message })
    };
  }
}
