import { Story } from "https://esm.sh/inkjs";

// Find every Ink game on the current page
const containers = document.querySelectorAll(".ink-story");

containers.forEach(async (container) => {
  const response = await fetch(container.dataset.story);

  if (!response.ok) {
    throw new Error(`Failed to load story: ${response.status}`);
  }

  const storyContent = await response.json();
  const story = new Story(storyContent);

  function advanceStory() {
    container.innerHTML = "";

    while (story.canContinue) {
      const text = story.Continue().trim();

      if (text) {
        const p = document.createElement("p");
        p.textContent = text;
        container.appendChild(p);
      }
    }

    story.currentChoices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice.text;

      button.addEventListener("click", () => {
        story.ChooseChoiceIndex(choice.index);
        advanceStory();
      });

      container.appendChild(button);
    });
  }

  advanceStory();
});