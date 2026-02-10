export const countLetter = (word: string[], letter: string): number => {
    let count = 0;
    for (const ch of word) {
        if (ch === letter) {
            count++;
        }
    }
    return count;
};
