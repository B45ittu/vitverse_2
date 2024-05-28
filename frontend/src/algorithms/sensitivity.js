const Filter = require("bad-words");
const filter = new Filter();

// Add your custom offensive words to the filter
filter.addWords('murder',
'kill',
'rape',
'suicide',
'abuse',
'assault',
'war',
'genocide',
'terrorism',
'racism',
'sexism',
'discrimination',
'lynch',
'slavery',
'holocaust',
'incest',
'pedophile',
'prostitute',
'misogyny',
'misandry',
'homophobic',
'transphobic',
'bigotry',
'extremism',
'bully',
'gang',
'drug',
'addiction',
'pornography',
'exploit',
'trafficking',
'harassment',
'cyberbullying',
'stalking',
'torture',
'necrophilia',
'bestiality',
'cannibalism',
'terrorism',
'massacre',
'suicidebombing',
'riot',
'hatecrime',
'slur',
'offensive',
'offend',
'hate',
'racialslur',
'xenophobia',
'murderer',
'rapist',
'assaulter',
'terrorist',
'abuser',
'genocidal',
'sexist',
'racist',
'bigot',
'extremist',
'drugaddict',
'addict',
'pornaddict',
'exploiter',
'trafficker',
'harasser',
'cyberbully',
'stalker',
'torturer',
'necrophile',
'bestialist',
'cannibal',
'terrorist',
'offender',
'hater',
'racist');

// Function to calculate Levenshtein distance between two strings
function levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
  
    const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));
  
    for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1, // Deletion
                    dp[i][j - 1] + 1, // Insertion
                    dp[i - 1][j - 1] + cost // Substitution
                );
            }
        }
    }
  
    return dp[len1][len2];
}

// Function to detect offensive language with fuzzy matching
export function detectOffensiveLanguage(text) {
    const words = text.split(/\s+/);
    for (const word of words) {
        if (filter.isProfane(word)) {
            return true; // Direct match found
        }
        // Check fuzzy match
        for (const badWord of filter.list) {
            if (levenshteinDistance(word.toLowerCase(), badWord.toLowerCase()) <= 1) {
                return true; // Fuzzy match found within Levenshtein distance of 1
            }
        }
    }
    return false; // No offensive language detected
}
