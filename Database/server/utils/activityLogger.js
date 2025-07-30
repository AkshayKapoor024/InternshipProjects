module.exports.logActivity = async ({db,
  activity,
  performedAt,
  fieldnumber,
  filename,
  filesize = null,
}) => {
  const query = `
    INSERT INTO ActivityLogs (activity, performed_at, fieldnumber, filename  )
    VALUES (?, ?, ?, ?)
  `;
  const values = [activity, performedAt, fieldnumber, filename];
  try {
    await db.execute(query, values);
    console.log(`📘 Logged activity: ${activity}`);
  } catch (err) {
    console.error(`❌ Activity log error: ${err.message}`);
  }
};