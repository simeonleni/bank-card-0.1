const container = document.querySelector(".container");

const setPerspective = (x, y) => {
  container.style.transition = "transform 0.05s ease-in-out";

  const rotateX =
    ((container.clientHeight / 2 - y) / container.clientHeight) * 40;

  const rotateY =
    ((container.clientWidth / 2 - x) / container.clientWidth) * 40;

  container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const resetPerspective = () => {
  container.style.transition = "transform 0.2s ease-in-out";
  container.style.transform = "none";
};

const handleMouseMove = (e) => {
  const { left, top, right, bottom } = container.getBoundingClientRect();
  const mouseX = e.clientX - left;
  const mouseY = e.clientY - top;

  if (
    mouseX >= 0 &&
    mouseY >= 0 &&
    mouseX <= right - left &&
    mouseY <= bottom - top
  ) {
    setPerspective(mouseX, mouseY);
  } else {
    resetPerspective();
  }
};

const moveToNext = (currentInput, nextInputId, prevInputId) => {
  const nextInput = document.getElementById(nextInputId);
  const prevInput = document.getElementById(prevInputId);

  if (prevInput && currentInput.value.length === 0) {
    prevInput.focus();
    return;
  }

  if (nextInput) {
    nextInput.focus();
  }
};

const handleInputNavigation = (e) => {
  const currentInput = document.activeElement;

  if (currentInput.tagName === "INPUT") {
    const allInputs = Array.from(document.querySelectorAll("input"));
    const currentIndex = allInputs.indexOf(currentInput);

    if (e.key === "ArrowRight") {
      const nextIndex = currentIndex + 1;
      if (nextIndex < allInputs.length) {
        allInputs[nextIndex].focus();
      }
    } else if (e.key === "ArrowLeft") {
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        allInputs[prevIndex].focus();
      }
    } else if (e.key === "Delete" || e.key === "Backspace") {
      const prevIndex = currentIndex - 1;

      if (currentInput.value.length === 0 && prevIndex >= 0) {
        allInputs[prevIndex].value = "";
        allInputs[prevIndex].focus();
      } else {
        currentInput.value = "";
      }
    }
  }
};

container.addEventListener("mousemove", handleMouseMove);
container.addEventListener("mouseleave", resetPerspective);
document.addEventListener("keydown", handleInputNavigation);
