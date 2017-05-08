all: resume.pdf

resume.pdf: resume.tex resume.sty
	pdflatex -halt-on-error resume.tex resume.pdf

clean:
	rm *.{out,aux,log}
