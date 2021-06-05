export default function TypeMenu({
  themeIsDark,
  activeType = "burger",
  activeTypeHandler = () => {},
}) {
  const types = [
    { title: "burger", icon: "/design-utils/burger.png" },
    { title: "pizza", icon: "/design-utils/pizza.png" },
    { title: "drink", icon: "/design-utils/drink.png" },
  ];

  return (
    <div className={`type-menu d-grid${themeIsDark ? " dark-theme" : ""}`}>
      {types.map((item) => {
        return (
          <div
            key={item.title}
            className={`menu-item${activeType === item.title ? " active" : ""}`}
          >
            <div className="item-title text-center text-cap">{item.title}</div>
            <div
              className="p-relative"
              onClick={() => activeTypeHandler(item.title)}
            >
              <img
                src={`/design-utils/type-menu-${
                  themeIsDark ? "dark-" : ""
                }shape.svg`}
                alt="background shape"
                className="bg-shape"
              />
              <img src={item.icon} alt="item shape" className="type-icon" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
