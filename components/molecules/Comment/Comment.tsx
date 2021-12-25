import type { FC } from "react";

export const Comment: FC = () => {
  return (
    <div className="px-5 pt-3 pb-3 bg-white">
      <div className="mb-0.5 space-x-2">
        <span className="font-semibold cursor-pointer text-neutral-900">
          Kilian Braquin
        </span>
        <time className="text-sm text-neutral-500">il y a 9 jours</time>
      </div>
      <p className="text-neutral-900">
        {
          "Rien à lui reprocher ! Plus performant qu'un 9900k pour 369e . J'ai un peu eu de mal avec pas mal d'écrans bleus sous Win 10, mais depuis le passage a Win 11 ça fonctionne parfaitement. Stable sous OC, sans monter exagérément en température. Je suis très satisfait."
        }
      </p>
    </div>
  );
};
