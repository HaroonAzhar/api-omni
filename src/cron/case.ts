import Case from "../models/Case";
import CaseStatus from "../models/Case/CaseStatus";

export const updateExpireTime = async () => {
  const caseModel = new Case();
  const caseStatusModel = new CaseStatus();
  const statusData = await caseStatusModel.select();
  const pendingStatus = statusData.filter(
    (record: { name: string }) => record.name === "pending"
  );
  const expiredStatus = statusData.filter(
    (record: { name: string }) => record.name === "expired"
  );
  if (!pendingStatus.length && !expiredStatus.length)
    throw new Error("Cannot Find Status pending or expired");
  const data = await caseModel
    .select()
    .where({ FkCaseStatusId: pendingStatus[0].case_status_id })
    .andWhereRaw("CreatedAt < dateadd(day,-14,getdate())");
  for (const val of data) {
    caseModel.setData("fk_case_status_id", expiredStatus[0].case_status_id);
    await caseModel.update().where({ CaseId: val.case_id });
    console.log("=== CRON UPDATED AT TIME =====");
  }
};
