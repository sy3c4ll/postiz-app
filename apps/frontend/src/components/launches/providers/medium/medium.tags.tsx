import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { ReactTags } from 'react-tag-autocomplete';

export const MediumTags: FC<{
  name: string;
  label: string;
  onChange: (event: { target: { value: any[]; name: string } }) => void;
}> = (props) => {
  const { onChange, name, label } = props;
  const { getValues } = useSettings();
  const [tagValue, setTagValue] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string>('');

  const onDelete = useCallback(
    (tagIndex: number) => {
      const modify = tagValue.filter((_, i) => i !== tagIndex);
      setTagValue(modify);
      onChange({ target: { value: modify, name } });
    },
    [tagValue]
  );

  const onAddition = useCallback(
    (newTag: any) => {
      if (tagValue.length >= 3) {
        return;
      }
      const modify = [...tagValue, newTag];
      setTagValue(modify);
      onChange({ target: { value: modify, name } });
    },
    [tagValue]
  );

  useEffect(() => {
    const settings = getValues()[props.name];
    if (settings) {
      setTagValue(settings);
    }
  }, []);

  const suggestionsArray = useMemo(() => {
    return [...tagValue, { label: suggestions, value: suggestions }].filter(f => f.label);
  }, [suggestions, tagValue]);

  return (
    <div>
      <div className="font-['Inter'] text-[14px] mb-[6px]">{label}</div>
      <ReactTags
        suggestions={suggestionsArray}
        selected={tagValue}
        onAdd={onAddition}
        onInput={setSuggestions}
        onDelete={onDelete}
      />
    </div>
  );
};