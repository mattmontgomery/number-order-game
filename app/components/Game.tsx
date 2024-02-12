"use client";

import Card from "./Card";
import clsx from "clsx";
import useGameReducer, {
  CARD_ABILITIES,
  canEat,
  getEightNeighors,
} from "./useGameReducer";

export function Game(props: {
  table: number[];
  deck: number[];
}): React.JSX.Element {
  "use client";
  const [{ active, deck, eaten, history, lost, mustEat, table }, dispatch] =
    useGameReducer({
      table: props.table,
      deck: props.deck,
    });
  const [eatable, eatableCard] = canEat(table);
  const lastCard = [...table].pop();
  const [lastCardDescription, getLastCardUsable, getLastCardEatenNumber] =
    lastCard && CARD_ABILITIES[lastCard]
      ? CARD_ABILITIES[lastCard]
      : [undefined, () => false, () => [...table]];
  const lastCardUsable = getLastCardUsable(getEightNeighors(table), table);
  return (
    <div className="grid grid-flow-row gap-8">
      {(lost || (mustEat && !eatable && !lastCardUsable)) && (
        <h2 className="text-red text-3xl font-extrabold">Lost!</h2>
      )}
      <div className="grid grid-cols-2 gap-4">
        <button
          className={clsx(
            "text-2xl p-8 bg-slate-800 text-white disabled:bg-gray-600 disabled:pointer-events-none rounded-lg",
            {
              "bg-pink-800 hover:bg-pink-600 transition-colors": eatable,
            }
          )}
          disabled={!eatable}
          onClick={() =>
            dispatch({
              type: "EAT_CARD",
              payload: eatableCard,
            })
          }
        >
          {eatable ? "Eat!" : "Cannot Eat"}
        </button>
        <button
          className={clsx(
            "text-2xl p-8 bg-slate-800 text-white disabled:bg-gray-600 disabled:pointer-events-none rounded-lg relative text-wrap",
            {
              "bg-pink-800 hover:bg-pink-600 transition-colors": lastCardUsable,
            }
          )}
          disabled={!lastCardUsable}
          onClick={() => {
            dispatch({
              type: "USE_CARD",
              payload: getLastCardEatenNumber(
                getEightNeighors(table)
              ) as number,
            });
          }}
        >
          {!lastCardUsable ? "Cannot use" : "Use"} card ability
          {lastCardDescription && (
            <div className="italic text-sm">{lastCardDescription}</div>
          )}
        </button>
      </div>
      <div className="grid grid-flow-col gap-4">
        {table.map((card, idx) => (
          <div className="relative" key={idx}>
            {idx === 0 && (
              <div
                className={clsx({
                  "absolute transition-opacity top-1/3 -left-6 ": true,
                  "opacity-0": !active,
                  "cursor-pointer": Boolean(active),
                })}
                onClick={() =>
                  dispatch({
                    type: "MOVE_ACTIVE_CARD_TO_START",
                  })
                }
              >
                ⬇️
              </div>
            )}
            <Card
              active={card === active}
              disabled={mustEat}
              eaten={false}
              number={card}
              onClick={() => {
                if (active === card) {
                  dispatch({
                    type: "REMOVE_ACTIVE_CARD",
                  });
                } else if (active) {
                  dispatch({
                    type: "SWAP_CARDS",
                    payload: [active, card],
                  });
                } else {
                  dispatch({
                    type: "SET_ACTIVE_CARD",
                    payload: card,
                  });
                }
              }}
            />
            {card === active && CARD_ABILITIES[card] && (
              <div className="absolute top-20 w-48 bg-white rounded-3xl p-4 shadow-2xl">
                {CARD_ABILITIES[card]?.[0]}
              </div>
            )}
            <div
              className={clsx({
                "absolute transition-opacity -right-2 top-1/3 ": true,
                "opacity-0": !active,
                "cursor-pointer": Boolean(active),
              })}
              onClick={() =>
                dispatch({
                  type: "MOVE_ACTIVE_CARD_AFTER_NUMBER",
                  payload: card,
                })
              }
            >
              ⬇️
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-flow-row gap-4">
        <h3 className="text-2xl">Eaten cards</h3>
        <div className="grid grid-flow-col gap-4">
          {eaten.map((card, idx) => (
            <div key={idx}>
              <Card active={card === active} eaten number={card} />
            </div>
          ))}
        </div>
      </div>
      <div>
        Moves: <h3>{history.length}</h3>
      </div>
    </div>
  );
}
