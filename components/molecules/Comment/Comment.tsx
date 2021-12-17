import type { FC } from "react";

export const Comment: FC = () => {
  return (
    <div className="px-5 py-2.5 bg-white">
      <div className="space-x-2">
        <span className="font-bold">Kilian Braquin</span>
        <time className="text-neutral-500">24 dec 2021</time>
      </div>
      <p className="text-neutral-700">
        {
          "Rien à lui reprocher ! Plus performant qu'un 9900k pour 369e . J'ai un peu eu de mal avec pas mal d'écrans bleus sous Win 10, mais depuis le passage a Win 11 ça fonctionne parfaitement. Stable sous OC, sans monter exagérément en température. Je suis très satisfait."
        }
      </p>
    </div>
  );
};
