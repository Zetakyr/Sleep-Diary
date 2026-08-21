export const importData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                 const data = JSON.parse(e.target.result);

                 if (data.format !== "pokemon-sleep-tracker") {
                    throw new Error("This is not a sleep dairy file")
                    return;
                 }

                 if (data.version !== 1) {
                    throw new Error(`Unsupported file version ${data.version}`);
                    return;
                 }

                 if (!Array.isArray(data.sleepData)) {
                    throw new Error("Invalid Sleep Diary data.");
                 }

                 const sleepData = data.sleepData;

                 resolve(sleepData);
            } catch (error) {
                reject(error);
            }
        }

        reader.onerror = () => {
            reject(new Error("Failed to read file."));
        }

        reader.readAsText(file);
    })
}