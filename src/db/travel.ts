import { client, connectDB } from "./client";

export async function createTravelPlan(
  userId: number,
  title: string,
  destinationCity: string,
  destinationCountry: string,
  startDate: string,
  endDate: string,
  budget?: number,
) {
  await connectDB();

  const result = await client.query(
    `
    INSERT INTO travel_plans 
      (user_id, title, destination_city, destination_country, start_date, end_date, budget)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [
      userId,
      title,
      destinationCity,
      destinationCountry,
      startDate,
      endDate,
      budget ?? null,
    ],
  );

  return result.rows[0];
}

export async function updateTravelPlan(
  planId: number,
  title?: string,
  budget?: number,
) {
  await connectDB();

  const result = await client.query(
    `
    UPDATE travel_plans
    SET
      title = COALESCE($2, title),
      budget = COALESCE($3, budget)
    WHERE id = $1
    RETURNING *
    `,
    [planId, title ?? null, budget ?? null],
  );

  return result.rows[0];
}

export async function getTravelPlans(userId: number) {
  await connectDB();

  const result = await client.query(
    `
    SELECT *
    FROM travel_plans
    WHERE user_id = $1
    ORDER BY start_date
    `,
    [userId],
  );

  return result.rows;
}
