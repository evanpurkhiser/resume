all: output/resume.pdf

output/resume.pdf: resume.md template.tex
	pandoc --template=template.tex resume.md -o output/resume.pdf

clean:
	rm output/resume.pdf
