export const foxDescriptions = [
  [
    'Look at that tail',

    "In the whimsical world of woodland wonders, there's a delightful creature known for its enchanting flair—the fox! And what truly sets this charming critter apart is its magical tail. Picture it: a fluffy cascade of russet fur, swaying with each graceful step, like a painter's brush adding splashes of joy to the forest canvas.",
  ],
  [
    'Look at that ears',
    "In the realm of woodland whimsy, where every creature is a marvel, there's one feature of the delightful fox that never fails to bring a smile—their ears! Picture them: perky and attentive, like little antennas tuned in to the melody of the forest.",
  ],
  [
    'Look at that nose',
    "Ah, the fox's nose—a marvel of nature's ingenuity and an endless source of cheer in the wild wonderland! Imagine it: a sleek, shiny button nestled amidst fur as soft as the morning dew. With each playful sniff and twitch, it's as if the fox is tapping into a world of scents and sensations that dance on the breeze.",
  ],
];

const sceneButtons = {
  foxButtons: [
    [1, 2, 1],
    [-1, 1.5, 1],
    [-1.5, -2.3, 0.5],
  ],
};

export const sceneButtonsArray = Object.entries(sceneButtons).map(
  ([key, value]) => ({
    [key]: value,
  })
);
