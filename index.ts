type EventCallback<T = unknown> = (...payload: T[]) => void;
type KeyOf<T> = keyof T & string;
export function emitter<Events extends Record<string, any> = any, Keys extends KeyOf<Events> = KeyOf<Events>>() {
	const map = new Map<Keys, EventCallback<Events[Keys]>[]>();
	return {
		on<K extends Keys = Keys>(name: K, cb: EventCallback<Events[K]>) {
			const cbs = map.get(name) ?? [];
			(cbs as any[]).push(cb);
			map.set(name, cbs);
		},
		off(name: Keys | "*", cb: EventCallback<Events[Keys]> | undefined = undefined) {
			if (name !== "*") {
				const cbs = map.get(name as Keys);
				cbs && cbs.splice(cbs?.indexOf(cb!!!) >>> 0, 1);
			}
			map.clear();
		},
		dispatch(name: Keys, ...data: Events[Keys][]) {
			const cbs = map.get(name) ?? [];
			for (let c of cbs!!! as EventCallback<Events[Keys]>[]) c(...data);
		},
	};
}
