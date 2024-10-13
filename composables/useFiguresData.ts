import type { Figure } from "~/types";

const useFiguresData = () => {
  const figuresData = useState<Figure[]>("figures");
  const setFiguresData = (data: Figure[]) => {
    figuresData.value = data;
  };

  return { figuresData, setFiguresData };
};

export default useFiguresData;
