import { Story } from "https://esm.sh/inkjs";

const response = await fetch("./story.json");
const storyContent = await response.json();

const story = new Story(storyContent);
const container = document.getElementById("story");

function advanceStory() {
  container.innerHTML = "";

  while (story.canContinue) {
    const paragraph = document.createElement("p");
    paragraph.textContent = story.Continue();
    container.appendChild(paragraph);
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