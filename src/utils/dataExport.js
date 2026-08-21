export const exportData = (sleepData) => {
    const exportFile = {
        format: "pokemon-sleep-tracker",
        version: 1,
        options: {},
        sleepData,
    };

    const json = JSON.stringify(exportFile, null, 2);

    const blob = new Blob([json], {
        type: "application/json",
    })

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "pokemon-sleep-data.json";
    link.click();

    URL.revokeObjectURL(url);
}