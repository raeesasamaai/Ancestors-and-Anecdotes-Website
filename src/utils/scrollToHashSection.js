export function scrollToHashSection(
  href,
  { updateHistory = true } = {}
) {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    !href?.startsWith("#")
  ) {
    return false;
  }

  const updateUrl = () => {
    if (!updateHistory) {
      return;
    }

    window.history.pushState(
      null,
      "",
      href
    );
  };

  if (href === "#home") {
    updateUrl();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return true;
  }

  const sectionId = href.replace(
    "#",
    ""
  );

  const section =
    document.getElementById(
      sectionId
    );

  if (!section) {
    return false;
  }

  if (href === "#what-we-do") {
    const sectionTop =
      section.getBoundingClientRect()
        .top + window.scrollY;

    updateUrl();

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });

    return true;
  }

  const computedScrollPaddingTop =
    Number.parseFloat(
      window.getComputedStyle(
        document.documentElement
      ).scrollPaddingTop
    );

  const sectionTop =
    section.getBoundingClientRect()
      .top + window.scrollY;

  const targetTop = Math.max(
    sectionTop -
      (Number.isNaN(
        computedScrollPaddingTop
      )
        ? 0
        : computedScrollPaddingTop),
    0
  );

  updateUrl();

  window.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });

  return true;
}
