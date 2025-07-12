ALTER TABLE public.private_items
ADD COLUMN status character varying NOT NULL DEFAULT 'Active',
ADD COLUMN updated_at timestamp WITH time zone NOT NULL DEFAULT NOW(); 