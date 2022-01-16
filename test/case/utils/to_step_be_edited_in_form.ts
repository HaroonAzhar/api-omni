export default (form: { [key: string]: any }[] | [any], stepName: string) => {
  const dipData = form[0];
  const step = dipData.steps.find(
    ({ name }: { name: string }) => name === stepName
  );
  expect(step.status).toBe("Edited");
};
